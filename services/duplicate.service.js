import { compare, crawl, sources } from "./crawle.service.js";

/**
 * Rank Array and Merge it with old one
 * @param {Array<string>} words 
 * @param {Array<string>} acc 
 * @param {Object} config 
 * @returns Array
 */
const listRanker = (words, acc, config) => {
    // we need to ranking words as object for performence issues
    const ranked = words.reduce((list, word) => {
        // filter words based on theres sizes
        // to avoid linking words like ['and', 'or' ...]   
        if (word.length > (config?.min ?? 1) && word.length < (config?.max ?? Infinity)) {
            list[word.toLowerCase()] = (list[word.toLowerCase()] || 0) + 1; // set item to 1 or increment if is already exists,
        }
        return list;
    }, {});

    // then we can easly convert them back into array
    const converted = Object.entries(ranked)
        .map(([name, value]) => ({ name, value }));

    // the we filter and return most 3 repeated words
    return mergeArrays(
        converted
            .sort((a, b) => b.value - a.value),
        acc
    ).slice(0, (config?.array ?? 3));

};

/**
 * Merge two arrays
 * @param {Array<string>} first 
 * @param {Array<string>} second 
 * @returns Array
 */
const mergeArrays = (first, second) => {
    const map = new Map();
    first.forEach(item => {
        map.set(item.name, (map.get(item.name) || 0) + item.value);
    });
    second.forEach(item => {
        map.set(item.name, (map.get(item.name) || 0) + item.value);
    });
    return Array.from(map, ([name, value]) => ({ name, value }));
}

/**
 * get duplicated sentences from given list
 * @param {Array} sentences 
 * @returns Array
 */
const duplicatedSentences = (sentences) => {
    const sentenceCounts = {};
    sentences.forEach(sentence => {
        const parsedSentece = sentence.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (parsedSentece) {
            sentenceCounts[parsedSentece] = {
                value: (sentenceCounts[parsedSentece]?.value || 0) + 1,
                raw: sentence
            };
        }
    });
    const duplicatedSentences = Object
        .values(sentenceCounts)
        .filter(sentence => sentence.value > 1);

    return duplicatedSentences;
}

const detectExternalDuplicate = async (paragraphs) => {
    const reports = await checKWrapper(paragraphs);
    console.log(reports);
    return reports;
}

const checKWrapper = (paragraphs) => {
    const promises = sources.map(async (source) => {
        const crawledParagraphs = await crawl(source);
        if (!crawledParagraphs) {
            return null;
        }
        const duplicated = await compare(crawledParagraphs, paragraphs)
        return {
            source, data: duplicated
        };
    });
    return Promise.all(promises);
}


export {
    listRanker,
    duplicatedSentences,
    detectExternalDuplicate
}