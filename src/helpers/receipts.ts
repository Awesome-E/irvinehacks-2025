'use server'
import { ReceiptEntry, StoredReceipt } from '../../types'
import { Receipts } from './db'

export async function fetchReceipts (): Promise<StoredReceipt[]> {
  // get the data from mongodb
  const receipts = await Receipts.find({}).sort({ _id: 'desc' }).lean() as unknown
  return receipts as StoredReceipt[]
}

export async function saveReceipt (name: string, data: ReceiptEntry[]) {
  const receiptInfo = {
    _id: Date.now(),
    name,
    date: new Date(),
    entries: data
  }
  await Receipts.insertMany([receiptInfo]);
  return receiptInfo
}
