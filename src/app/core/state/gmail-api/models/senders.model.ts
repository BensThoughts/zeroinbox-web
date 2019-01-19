export interface ISenders {
  id: string;
  count: number;
  fromAddress: string;
  fromNames: Array<string>;
  threadIds_internalDate: Array<{
    threadId: string;
    internalDate: number;
  }>
  totalSizeEstimate: number;
  actionDelete: boolean;
  actionLabel: boolean;
}
