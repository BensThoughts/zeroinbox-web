import { Injectable, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { EditLabelAction, AppState } from '@app/core';
import { TaskActionTypes } from './tasks.actions';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { LabelEditComponent } from '../components/label-edit-prompt/label-edit-prompt.component';

@Injectable()
export class TasksEffects {

    @Effect({dispatch: false})
    editLabel = this.actions$.pipe(
        ofType<EditLabelAction>(TaskActionTypes.EditLabel),
        exhaustMap((action) => {
            let dialoagRef = this.dialogService.open(LabelEditComponent);
            let instance = dialoagRef.componentInstance;
            instance.labelName = action.payload.labelName;
            return dialoagRef
            .afterClosed()
            .pipe(
                map(confirmed => {
                    if (confirmed) {
                        console.log('DELETE');
                    } else {
                        console.log('SAVE');
                    }
                })
            )
        })
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dialogService: MatDialog
        ) {

    }

}