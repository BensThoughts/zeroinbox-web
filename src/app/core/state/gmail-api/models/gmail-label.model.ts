export interface IGmailLabel {
  id?: string;
  labelListVisibility: string;
  messageListVisibility: string;
  name: string;
  type: string;
  senders?: boolean;
  sendersFor?: string;
  sendersCount?: number;
}
