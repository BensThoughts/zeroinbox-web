import {Action} from '@ngrx/store';
import { ITask } from './tasks.model';

export enum TaskActionTypes {
  UpsertTasks = '[Suggestions Effects] Upsert Tasks Action',
  ResetTasks = '[Auth Effects] Reset Tasks',
  UpdateTasks = '[Tasks Effects] Update Tasks State From Other Window'
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
