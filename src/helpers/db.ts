import mongoose, { model, Schema } from 'mongoose';

mongoose.connect(process.env.MONGO_URL!);

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

export const Item = model('item', itemSchema, 'item')


const receiptSchema = new Schema({
  id: {
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
    default: () => Date.now(),
    immutable: true,
  },
});

export const Receipts = model('receipts', receiptSchema, 'receipts');




