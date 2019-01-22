import {Action} from '@ngrx/store';
import { ITask } from './tasks.model';
import { Update, EntityMap, Dictionary } from '@ngrx/entity';

export enum TaskActionTypes {
  UpsertTasks = '[Suggestions Effects] Upsert Tasks Action',
  ResetTasks = '[Auth Effects] Reset Tasks'
}


export class UpsertTasksAction implements Action {
  readonly type = TaskActionTypes.UpsertTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class ResetTasksStateAction implements Action {
  readonly type = TaskActionTypes.ResetTasks;

}

export type TaskActions =

  | ResetTasksStateAction
  | UpsertTasksAction;
