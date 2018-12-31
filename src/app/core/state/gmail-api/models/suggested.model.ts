export interface ISuggested {
  id: string | Int32Array;
  fromName: string;
  fromAddress: string;
  labelId: string;
  labelName: string;
  threadIds: string[];
  count: number;
}
