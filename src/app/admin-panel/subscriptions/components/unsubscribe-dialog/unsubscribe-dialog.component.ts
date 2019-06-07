import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-unsubscribe-dialog',
  templateUrl: './unsubscribe-dialog.component.html',
  styleUrls: ['./unsubscribe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeDialogComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<UnsubscribeDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() sender: ISender;

  unsubscribeText: string = 'Would you like to unsubscribe?';
  unsubscribeNewTab: boolean = false;

  ngOnInit() {
    if (this.sender.unsubscribeWeb !== null) {
      this.unsubscribeNewTab = true;
    }
  }

  unsubscribe() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}