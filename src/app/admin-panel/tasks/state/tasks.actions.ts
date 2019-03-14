import {Action} from '@ngrx/store';
import { ITaskCreator } from '../model/tasks.creator.model';

export enum TaskActionTypes {
  AddTasks = '[Suggestions Effects] Add Tasks',
}


export class AddTasksAction implements Action {
  readonly type = TaskActionTypes.AddTasks;
  constructor(public payload: { tasks: ITaskCreator }) {}
}


export type TaskActions =
  | AddTasksAction

