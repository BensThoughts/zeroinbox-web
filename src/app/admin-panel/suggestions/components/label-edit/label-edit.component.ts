import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { AddLabelAction } from '../../state/suggestions.actions';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelEditComponent {
  constructor(
    private ref: MatDialogRef<LabelEditComponent>,
    private store: Store<AppState>
    ) {}

  @Input() labelNames: string[];
  @Input() sender$: Observable<ISender>;
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