import Entry from '../modals/entry.modal.js';
import * as duplicateService from './duplicate.service.js';
import * as statisticService from './statistic.service.js';
import { ErrorJSON } from '../utils/error.js';


/**
 * create entry
 * @param {Array} paragraphs 
 * @param {string} statistic_id 
 * @returns {Array}
 */
const createEntry = async (paragraphs, statistic_id, userId) => {
  try {
    const entry = await Entry.create({
      paragraphs: paragraphs,
      statistics: statistic_id,
      userId
    });
    return entry;
  } catch (error) {
    throw new ErrorJSON(500, error);
  }
}

/**
 * get entry by id
 * @param {string} uuid 
 * @returns {Object}
 */
const getEntry = async (id) => {
  try {
    const entry = await Entry.findOne({
      _id:id
    }).populate('statistics');
    if (!entry) throw new ErrorJSON(404, `No entry found with id ${id} !`);
    return entry;
  } catch (error) {
    throw new ErrorJSON(500, error.message);
  }
}


/**
 * get all user entries
 * @param {Object} id 
 * @returns {Array<Object>}
 */
const getAllUserEntries = async (id) => {
  try {
    const entries = await Entry.find({
      userId:id
    }).populate('statistics');
    if (!entries) throw new ErrorJSON(404, `No entry found for the user with id ${id} !`);
    return entries;
  } catch (error) {
    throw new ErrorJSON(500, error.message);
  }
}

/**
 * Get Statistics Summury from given text
 * @param {string} entry 
 * @returns {Object}
 */
const getEntrySummury = async (entry, id) => {
  const paragraphs = await splitEntry(entry);
  const statistics = await entryStatistics(paragraphs)

  const statisticObject = {
    message: 'Text processed successfully',
    summary: `Received ${entry.length} characters of text.`,
    size: `${Math.floor(entry.length / 1024)} kb`,
    total: {
      paragraphs: statistics.length,
      lines: statistics.map(item => item.lines).reduce((acc, value) => acc + value, 0),
      specials: statistics.map(item => item.specials).reduce((acc, value) => acc + value, 0),
      sentences: statistics.map(item => item.sentences).reduce((acc, value) => acc + value, 0),
      averageWordsPerSentence: Math.floor(statistics.map(item => item.averages.wordsPerSentence).reduce((acc, value) => acc + value, 0) / statistics.length)
    },
    paragraphs: statistics,
  }

  try {
    const duplicates = await duplicateService.detectExternalDuplicate(paragraphs);
    statisticObject.duplicates = duplicates;
  } catch (error) {
    console.error(error);
  }

  if (!paragraphs || !paragraphs.length) {
    throw new ErrorJSON(500, "We can't process your entry!");
  };

  const statisticCreated = await statisticService.createStatistic(statisticObject);
  const entryCtreated = await createEntry(paragraphs, statisticCreated._id.toString(), id);

  return statisticObject;
}

/**
 * Generate paragraph statistics
 * @param {Array} paragraphs 
 * @returns Promise
 */
const entryStatistics = (paragraphs) => {
  return new Promise((resolve) => {
    const sections = [];
    paragraphs.forEach((paragraph) => {
      let section = {
        words: 0,
        lines: 0,
        sentences: 0,
        specials: 0,
        averages: {
          wordsPerSentence: 0,
        }
      };

      let MostWords = [];
      let MostLinkingWords = [];

      const sentences = paragraph.split(/(?<=[.!?])\s+/);
      const duplicatedSentences = duplicateService.duplicatedSentences(sentences);

      paragraph.split(/\n/g).forEach((line) => {
        const words = line.split(/\s+/).filter(Boolean); // filter(Boolean) to remove empty words like ""

        section.lines++;
        section.words += words?.length || 1;
        section.sentences += (line.match(/[.!?]/g) || [])?.length || 1;
        section.specials += line.match(/[^a-zA-Z0-9\s]/g)?.length || 1;

        MostWords = duplicateService.listRanker(words, MostWords, { max: Infinity, min: 5 });
        MostLinkingWords = duplicateService.listRanker(words, MostLinkingWords, { max: 5, min: 1 });

      });
      section.duplicatedSentences = duplicatedSentences;
      section.mostWordsperParagraph = MostWords;
      section.mostLinkingWordsperParagraph = MostLinkingWords;
      section.averages.wordsPerSentence = Math.floor(section.words / section.sentences);
      sections.push(section);
    })
    resolve(sections);
  });
}

/**
 * split entry into paragraphs
 * @param {string} entry 
 * @returns Promise
 */
const splitEntry = (entry) => {
  return new Promise((resolve) => {
    const paragraphs = entry.split(/\n\n+/);
    resolve(paragraphs);
  });
}

export {
  getEntrySummury,
  getEntry,
  getAllUserEntries
}