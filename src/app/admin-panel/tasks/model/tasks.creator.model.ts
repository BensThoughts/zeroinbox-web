export interface ITaskCreator {
    deleteTasks: string[];
    labelByNameTasks: string[];
    labelBySizeTasks: string[];
    sizeGroup?: string;
  }