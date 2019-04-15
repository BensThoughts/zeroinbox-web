import {Action} from '@ngrx/store';
import { ITaskCreator } from '../model/tasks.creator.model';

export enum TaskActionTypes {
  AddTasks = '[Suggestions Effects] Add Tasks',
  EditLabel = '[Label Table Component] Edit Label',
  SaveLabel = '[Edit Label Component] Save Label',
  DeleteLabel = '[Edit Label Component] Delete Label'
}

export class AddTasksAction implements Action {
  readonly type = TaskActionTypes.AddTasks;
  constructor(public payload: { tasks: ITaskCreator }) {}
}

export class EditLabelAction implements Action {
  readonly type = TaskActionTypes.EditLabel;
  constructor(public payload: { suggestion: any, labelName: string }) {}
}

export class SaveLabelAction implements Action {
  readonly type = TaskActionTypes.SaveLabel;
}

export class DeleteLabelAction implements Action {
  readonly type = TaskActionTypes.DeleteLabel;
}

export type TaskActions =
  | AddTasksAction
  | EditLabelAction
  | SaveLabelAction
  | DeleteLabelAction


