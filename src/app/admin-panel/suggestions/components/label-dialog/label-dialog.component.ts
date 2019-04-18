import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { AddLabelAction } from '../../state/suggestions.actions';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDialogComponent {
  constructor(
    private ref: MatDialogRef<LabelDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() labelNames$: Observable<string[]>;
  @Input() sender: ISender;

  addLabel() {
    this.store.dispatch(new AddLabelAction({ sender: this.sender }));
  }

  save() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}