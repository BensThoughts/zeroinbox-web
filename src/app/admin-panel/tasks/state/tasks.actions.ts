import {Action} from '@ngrx/store';
import { ITaskCreator } from '../model/tasks.creator.model';

export enum TaskActionTypes {
  AddTasks = '[Suggestions Effects] Add Tasks',
  EditLabel = '[Label Table Component] Edit Label'
}


export class AddTasksAction implements Action {
  readonly type = TaskActionTypes.AddTasks;
  constructor(public payload: { tasks: ITaskCreator }) {}
}

export class EditLabelAction implements Action {
  readonly type = TaskActionTypes.EditLabel;
}


export type TaskActions =
  | AddTasksAction

