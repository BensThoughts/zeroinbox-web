export interface ITask {
  id: string;
  delete: boolean;
  labelByName?: boolean;
  labelBySize?: boolean;
  labelByCount?: boolean;
  labelNames?: string[];
}
