import {Action} from '@ngrx/store';
import { ISuggestedTask } from '../models/suggested-task.model';
import { Update } from '@ngrx/entity';

export enum SuggestedTaskActionTypes {
  UpsertSuggestedTask = '[Suggestions Datatable Component] Upsert Suggested Action'
}

export class UpsertSuggestedTaskAction implements Action {
  readonly type = SuggestedTaskActionTypes.UpsertSuggestedTask;

  constructor(public payload: { task: ISuggestedTask }) {}
}
