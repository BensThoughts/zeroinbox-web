export interface ISender {
  senderId: string;
  fromAddress: string;
  fromName: string;
  threadIdCount: number;
  messageIdCount: number;
  totalSizeEstimate: number;
  sizeGroup: string;
  unsubscribeWeb: string;
  unsubscribeEmail: string;
  unsubscribed: boolean;
  // labelNames: string[];
}
