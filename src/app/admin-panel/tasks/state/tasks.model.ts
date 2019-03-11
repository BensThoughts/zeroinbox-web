export interface ITask {
  id: string;
  delete: boolean;
  labelByName?: boolean;
  labelBySize?: boolean;
  labelByCount?: boolean;
  labelName?: string;
}

export interface ITaskCreator {
  deleteTasks?: string[];
  labelByNameTasks?: string[];
  labelBySizeTasks?: string[];
  labelByCountTasks?: string[];
}
