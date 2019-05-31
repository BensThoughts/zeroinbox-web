import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppState } from '@app/core';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface ConfirmationObject {
  save: boolean;
  category: string;
  labelName: string;
}
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LabelDialogComponent {

  form: FormGroup;

  categories = [
    { name: 'No Category', value: 'NO_CATEGORY'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Friends', value: 'Friends'},
    { name: 'Work', value: 'Work'}
  ]

  defaultCategory = this.categories[0].name;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<LabelDialogComponent>,
    private store: Store<AppState>
    ) {}

  @Input() labelNames$: Observable<string[]>;
  @Input() sender: ISender;

  currentCategory;

  onCategorySelect($event) {
    // console.log($event);
    this.currentCategory = $event.value; 
  }

  save() {
    let confirmationObj: ConfirmationObject = {
      save: true,
      category: this.currentCategory,
      labelName: 'TEST'
    }
    this.ref.close(confirmationObj);
  }

  cancel() {
    let confirmationObj: ConfirmationObject = {
      save: false,
      category: '',
      labelName: ''
    }
    this.ref.close(confirmationObj);
  }

}