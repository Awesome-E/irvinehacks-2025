'use server'
import { Receipts } from './db'


export async function fetchReceipts () {
  // get the data from mongodb
  console.log('mong', process.env.MONGO_URL)
  const receipts = await Receipts.find({}).lean()
  console.log('goose', receipts)
  return receipts
}

