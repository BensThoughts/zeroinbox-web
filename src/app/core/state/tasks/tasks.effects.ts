import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { TaskActionTypes, UpsertTasksAction } from './tasks.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { map, take } from 'rxjs/operators';
import { selectEntities } from './tasks.selectors';
import { Update } from '@ngrx/entity';
import { ITask } from './tasks.model';

@Injectable()
export class TasksEffects {


    constructor(
      private actions$: Actions,
      private store: Store<AppState>) { }
  }
