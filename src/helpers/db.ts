import mongoose, { model, Schema } from 'mongoose';

const receiptSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date(),
    immutable: true,
  },
  entries: {
    type: Array,
    required: true,
    default: () => []
  }
});


mongoose.connect(process.env.MONGO_URL!);

export const Receipts = mongoose.models.receipts ?? model('receipts', receiptSchema, 'receipts');
