import {Action} from '@ngrx/store';
import { ITask } from './tasks.model';
import { Update, EntityMap, Dictionary } from '@ngrx/entity';

export enum TaskActionTypes {
  CreateTasks = '[Suggestions Component] Create Tasks',
  LabelTypeTasks = '[Suggestions Effects] Label Type Tasks Action',
  LabelTestTasks = '[Suggestions Component] Label Test Tasks',
  DeleteTypeTasks = '[Suggestions Effects] Delete Type Tasks Action',
  UpsertTasks = '[Tasks Effects] Upsert Tasks Action',
  ResetTasks = '[Auth Effects] Reset Tasks'
}

export class LabelTestTasksAction implements Action {
  readonly type = TaskActionTypes.LabelTestTasks;

  constructor(public payload: { entityMap: EntityMap<ITask> }) {}
}


export class CreateTasksAction implements Action {
  readonly type = TaskActionTypes.CreateTasks;

  constructor(public payload: { tasks: ITask[] }) {}
}

export class LabelTypeTasksAction implements Action {
  readonly type = TaskActionTypes.LabelTypeTasks;

  constructor(public payload: { labels: Dictionary<{id: { label: string } }> }) {}
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

  | LabelTestTasksAction

  | LabelTypeTasksAction
  | DeleteTypeTasksAction

  | ResetTasksStateAction
  | UpsertTasksAction;
