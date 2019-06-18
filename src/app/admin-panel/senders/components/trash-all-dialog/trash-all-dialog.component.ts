import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';

@Component({
  selector: 'app-trash-all-dialog',
  templateUrl: './trash-all-dialog.component.html',
  styleUrls: ['./trash-all-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrashAllDialogComponent {
  constructor(
    private ref: MatDialogRef<TrashAllDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() senders: ISender[];

  delete() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}