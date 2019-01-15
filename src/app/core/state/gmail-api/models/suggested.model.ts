export interface ISuggested {
  count: number;
  fromAddress: string;
  fromNames: Array<string>;
  froms: Array<string>;
  threadIds_internalDate: Array<{
    threadId: string;
    internalDate: number;
  }>
  totalSizeEstimate: number;
}
