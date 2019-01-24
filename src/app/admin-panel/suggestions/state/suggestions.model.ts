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
