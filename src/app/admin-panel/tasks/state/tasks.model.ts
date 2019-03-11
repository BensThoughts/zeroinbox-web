export interface ITask {
  id: string;
  delete: boolean;
  labelByName?: boolean;
  labelBySize?: boolean;
  labelByCount?: boolean;
  labelNames?: string[];
}

export interface ITaskCreator {
  deleteTasks?: string[];
  labelByNameTasks?: string[];
  labelBySizeTasks?: string[];
  labelByCountTasks?: string[];
  labelName?: string;
}
