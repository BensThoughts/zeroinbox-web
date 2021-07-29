import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';

@Component({
  selector: 'app-trash-dialog',
  templateUrl: './trash-dialog.component.html',
  styleUrls: ['./trash-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrashDialogComponent {
  constructor(
    private ref: MatDialogRef<TrashDialogComponent>,
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
