import {Action} from '@ngrx/store';
import { ITask, ITaskCreator } from './tasks.model';

export enum TaskActionTypes {
  AddTasks = '[Suggestions Effects] Add Tasks',
  UpsertTasks = '[Tasks Effects] Upsert Tasks Action',
  ResetTasks = '[Auth Effects] Reset Tasks',
  UpdateTasks = '[Tasks Effects] Update Tasks State From Other Window'
}


export class AddTasksAction implements Action {
  readonly type = TaskActionTypes.AddTasks;
  constructor(public payload: { tasks: ITaskCreator }) {}
}

export class UpsertTasksAction implements Action {
  readonly type = TaskActionTypes.UpsertTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class ResetTasksStateAction implements Action {
  readonly type = TaskActionTypes.ResetTasks;

}

export class UpdateTasksStateAction implements Action {
  readonly type = TaskActionTypes.UpdateTasks;
  constructor(public payload: any) {}
}

export type TaskActions =

  | ResetTasksStateAction
  | UpsertTasksAction

  | UpdateTasksStateAction
