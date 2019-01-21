import {Action} from '@ngrx/store';
import { ITask } from './tasks.model';
import { Update } from '@ngrx/entity';

export enum TaskActionTypes {
  CreateTasks = '[Suggestions Component] Create Tasks',
  LabelTypeTasks = '[Suggestions Effects] Label Type Tasks Action',
  DeleteTypeTasks = '[Suggestions Effects] Delete Type Tasks Action',
  UpsertTasks = '[Tasks Effects] Upsert Tasks Action',
  ResetTasks = '[Auth Effects] Reset Tasks'
}

export class CreateTasksAction implements Action {
  readonly type = TaskActionTypes.CreateTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class LabelTypeTasksAction implements Action {
  readonly type = TaskActionTypes.LabelTypeTasks;

  constructor(public payload: { ids_labels: { id: string, label: string }[] }) {}
}

export class DeleteTypeTasksAction implements Action {
  readonly type = TaskActionTypes.DeleteTypeTasks;

  constructor(public payload: { ids: string[] }) {}
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

  | LabelTypeTasksAction
  | DeleteTypeTasksAction

  | ResetTasksStateAction
  | UpsertTasksAction;
