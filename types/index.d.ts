export interface GPTReceiptEntry {
  inferred: string;
  quantity: number;
}

export type GPTReceiptResponse = Record<string, GPTReceiptEntry>

export interface FMAProductInfo {
  ID: number;
  Category_ID: number;
  Name: string;
  Name_subtitle: string;
  Keywords: string;
  Pantry_Min: number;
  Pantry_Max: number;
  Pantry_Metric: string;
  Pantry_tips: string;
  DOP_Pantry_Min: number;
  DOP_Pantry_Max: number;
  DOP_Pantry_Metric: string;
  DOP_Pantry_tips: string;
  Pantry_After_Opening_Min: number;
  Pantry_After_Opening_Max: number;
  Pantry_After_Opening_Metric: string;
  Refrigerate_Min: number;
  Refrigerate_Max: number;
  Refrigerate_Metric: string;
  Refrigerate_tips: string;
  DOP_Refrigerate_Min: number;
  DOP_Refrigerate_Max: number;
  DOP_Refrigerate_Metric: string;
  DOP_Refrigerate_tips: string;
  Refrigerate_After_Opening_Min: number;
  Refrigerate_After_Opening_Max: number;
  Refrigerate_After_Opening_Metric: string;
  Refrigerate_After_Thawing_Min: number;
  Refrigerate_After_Thawing_Max: number;
  Refrigerate_After_Thawing_Metric: string;
  Freeze_Min: number;
  Freeze_Max: number;
  Freeze_Metric: string;
  Freeze_Tips: string;
  DOP_Freeze_Min: number;
  DOP_Freeze_Max: number;
  DOP_Freeze_Metric: string;
  DOP_Freeze_Tips: string;
}

export interface ReceiptEntry {
  original: string;
  processed: string;
  info: FMAProductInfo | null;
  quantity: number;
}
