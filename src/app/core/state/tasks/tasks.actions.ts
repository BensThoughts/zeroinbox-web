import {Action} from '@ngrx/store';
import { ITask } from './tasks.model';
import { Update } from '@ngrx/entity';

export enum TaskActionTypes {
  CreateTasks = '[Suggestions Component] Create Tasks',
  UpsertTasks = '[Suggestions Datatable Component] Upsert Senders Action',
  ResetTasks = '[Auth Effects] Reset Tasks'
}

export class CreateTasksAction implements Action {
  readonly type = TaskActionTypes.CreateTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class UpsertTasksAction implements Action {
  readonly type = TaskActionTypes.UpsertTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class ResetTasksStateAction implements Action {
  readonly type = TaskActionTypes.ResetTasks;

}

export type TaskActions =
  | CreateTasksAction
  | ResetTasksStateAction
  | UpsertTasksAction;
