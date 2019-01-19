export interface ISuggestion {
  id: string;
  fromAddress: string;
  count: number;
  labelName?: string;
  label: boolean;
  delete: boolean;
}
