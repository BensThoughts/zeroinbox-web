export interface ISuggested {
  count: number;
  fromAddress: string;
  fromNames: Array<string>;
  from: string;
  threadIds_internalDate: Array<{
    threadId: string;
    internalDate: number;
  }>
  totalSizeEstimate: number;
  actionDelete: boolean;
  actionLabel: boolean;
}
