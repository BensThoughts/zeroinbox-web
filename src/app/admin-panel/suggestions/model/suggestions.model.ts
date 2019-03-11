export interface ISuggestion {
  id: string;
  // fromAddress?: string;
  // fromName?: string;
  // count?: number;
  // totalSizeEstimate?: number;
  labelByName?: boolean;
  labelBySize?: boolean;
  labelByCount?: boolean;
  delete?: boolean;
}

export interface ISizes {
  Xl: number;
  Lg: number;
  Md: number;
  Sm: number;
  Xs: number;
}


