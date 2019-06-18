import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {
  constructor(
    private ref: MatDialogRef<DeleteDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() sender: ISender;

  delete() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}