import mongoose from 'mongoose';
import crypto from 'crypto';

const StatisticsSchema = new mongoose.Schema({
  // to need for UUID mongodb will generate a one automatically for each row.
  // uuid: {
  //   type: String,
  //   default: crypto.randomUUID(),
  //   unique: true,
  // },
  message: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  total: {
    paragraphs: {
      type: Number,
      default: 0,
      required: true,
    },
    lines: {
      type: Number,
      default: 0,
      required: true,
    },
    specials: {
      type: Number,
      default: 0,
      required: true,
    },
    sentences: {
      type: Number,
      default: 0,
      required: true,
    },
    averageWordsPerSentence: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  paragraphs: [{
    uuid: {
      type: String,
      default: crypto.randomUUID()
    },
    words: {
      type: Number,
      default: 0,
      required: true,
    },
    lines: {
      type: Number,
      default: 0,
      required: true,
    },
    sentences: {
      type: Number,
      default: 0,
      required: true,
    },
    averages: {
      wordsPerSentence: {
        type: Number,
        default: 0,
        required: true,
      }
    },
    duplicatedSentences: [{
      value: {
        type: Number,
        required: true
      },
      raw: {
        type: String,
        required: true
      }
    }],
    mostWordsperParagraph: [{
      name: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }],
    mostLinkingWordsperParagraph: [{
      name: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }],
    words: {
      type: Number,
      default: 0,
      required: true,
    },
  }]
});

export default mongoose.model('Statistics', StatisticsSchema);