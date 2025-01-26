'use server'
import { ReceiptEntry } from '../../types'
import { Receipts } from './db'

export async function fetchReceipts () {
  // get the data from mongodb
  const receipts = await Receipts.find({}).lean()
  return receipts
}

export async function saveReceipt (name: string, data: ReceiptEntry[]) {
  const receiptInfo = {
    _id: Date.now(),
    name,
    date: new Date(),
    entries: data
  }
  await Receipts.insertMany([receiptInfo]);
}
