export interface ISuggestion {
  senderId: string;
  labelByName?: boolean;
  labelBySize?: boolean;
  labelByCount?: boolean;
  delete?: boolean;
  labelNames?: string[];
}


