export interface ISuggestion {
  id: string;
  fromAddress: string;
  fromName: string;
  count: number;
  totalSizeEstimate: number;
  labelByName?: string;
  labelBySize?: string;
  labelByCount?: string;
}

export interface ISizes {
  Xl: number;
  Lg: number;
  Md: number;
  Sm: number;
  Xs: number;
}
