'use server';
import { readFileSync } from "fs";
import { FMAProductInfo, GPTReceiptResponse, ReceiptEntry } from "../../types";

const DATA_DUMP_PATH = 'public/foods.json'

function getProductsFromDataDump (): FMAProductInfo[] {
  const dataDump = JSON.parse(readFileSync(DATA_DUMP_PATH).toString())
  // @ts-expect-error expect any type right now
  const productsSheet = dataDump.sheets.find(s => s.name === 'Product')
  // @ts-expect-error expect any type right now
  const products = productsSheet.data.map(row => Object.assign({}, ...row))
  return products
}

const products = getProductsFromDataDump()

/**
 * Generates a score, 0-1, based on how many product name words are found in the keywords of an FMA entry
 * @param name Name of the inferred product as seen on receipt
 * @param keywordsStr Keywords from FMA Info
 */
function getKWMatchScore (name: string, keywordsStr: string) {
  const query = name.toLowerCase().split(' ')
  const keywords = keywordsStr.toLowerCase().split(',')
  const matchCount = query.filter(q => keywords.includes(q)).length
  return matchCount / query.length / keywords.length
}

function getSingleMatch (inferredProductName: string): FMAProductInfo | null {
  let bestMatch = null
  let bestScore = 0
  products.forEach(product => {
    const matchScore = getKWMatchScore(inferredProductName, product.Keywords ?? product.Name)
    if (matchScore <= bestScore) return
    bestScore = matchScore
    bestMatch = product
  })
  return bestMatch
}

export async function getFMAInfo(items: GPTReceiptResponse): Promise<ReceiptEntry[]> {
  const entries = Object.entries(items)
  const fmaInfo: ReceiptEntry[] = []
  for (const [name, { inferred, ...other }] of entries) {
    const bestMatch = getSingleMatch(inferred)
    fmaInfo.push({ original: name, processed: inferred, info: bestMatch, ...other })
  }
  return fmaInfo
}
