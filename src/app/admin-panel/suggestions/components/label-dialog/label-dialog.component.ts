import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDialogComponent {
  categories = [
    { name: 'No Category', value: 'NO_CATEGORY'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Friends', value: 'Friends'},
    { name: 'Work', value: 'Work'}
  ]

  defaultCategory = this.categories[0].name;

  constructor(
    private ref: MatDialogRef<LabelDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() labelNames$: Observable<string[]>;
  @Input() sender: ISender;

  save() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}