import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';

@Component({
  selector: 'app-delete-all-dialog',
  templateUrl: './delete-all-dialog.component.html',
  styleUrls: ['./delete-all-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteAllDialogComponent {
  constructor(
    private ref: MatDialogRef<DeleteAllDialogComponent>,
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