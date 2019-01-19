// import { ISenderTasks } from './senders-light.model';

export interface ITask {
  id: string;
  fromAddress: string;
  delete: boolean;
  labels: string[];
}
