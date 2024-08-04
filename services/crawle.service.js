import axios from 'axios';
import { load } from 'cheerio';

export const sources = [
  'https://edition.cnn.com/2024/08/03/sport/paris-olympics-100m-final-spt-intl/index.html'
]

export const crawl = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);
    const paragraphs = [];
    $('p').map((i, el) => paragraphs.push($(el).text().trim())).get();
    return paragraphs;
  } catch (error) {
    return "";
  }
};

export const compare = async (listOne, listTwo) => {

  const posOne = new Map();
  const posTwo = new Map();

  // Populate the position maps
  listOne.forEach((text, index) => {
      if (!posOne.has(text)) {
          posOne.set(text, []);
      }
      posOne.get(text).push(index);
  });

  listTwo.forEach((text, index) => {
      if (!posTwo.has(text)) {
          posTwo.set(text, []);
      }
      posTwo.get(text).push(index);
  });

  const results = [];

  // Find duplicates and their positions
  posOne.forEach((positionsOne, text) => {
      if (posTwo.has(text)) {
          const positionsTwo = posTwo.get(text);
          results.push({
              duplicatedText: text,
              onEntryParagraph: positionsTwo
          });
      }
  });
  return results;
};