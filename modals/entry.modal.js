import mongoose from 'mongoose';
import crypto from 'crypto';

const EntrySchema = new mongoose.Schema({
  // to need for UUID mongodb will generate a one automatically for each row.
  // uuid: {
  //   type: String,
  //   default: crypto.randomUUID(),
  //   unique: true,
  // },
  userId: {
    type: String,
    required: true,
  },
  statistics:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Statistics"
  },
  paragraphs: [{
    type: String,
    required: true
  }],
});

export default mongoose.model('Entry', EntrySchema);