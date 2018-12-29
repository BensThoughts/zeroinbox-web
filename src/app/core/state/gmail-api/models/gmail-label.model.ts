export interface IGmailLabel {
  id?: string;
  labelListVisibility: string;
  messageListVisibility: string;
  name: string;
  type: string;
  suggested?: boolean;
  suggestedFor?: string;
  suggestedCount?: number;
}
