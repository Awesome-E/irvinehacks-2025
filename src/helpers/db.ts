import mongoose, { model, Schema } from 'mongoose';

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: () => Date.now(),
    immutable: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  receiptID: {
    type: Number,
    ref: 'Receipt',
    required: true,
  },
});

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

export const Item = mongoose.models.items ?? model('items', itemSchema, 'items')
export const Receipts = mongoose.models.receipts ?? model('receipts', receiptSchema, 'receipts');
