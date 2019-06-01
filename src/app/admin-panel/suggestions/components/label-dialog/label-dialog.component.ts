import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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

  @Input() sender: ISender;

  name = new FormControl('');

  categories = [
    { name: 'No Category', value: 'NO_CATEGORY'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Friends', value: 'Friends'},
    { name: 'Work', value: 'Work'}
  ]

  defaultCategory = this.categories[0].value;
  currentCategory: string;

  constructor(
    private ref: MatDialogRef<LabelDialogComponent>,
    ) { }


  ngOnInit() {
    this.name.setValue(this.sender.labelNames[0]);
    this.currentCategory = this.defaultCategory;
  }

  onCategorySelect($event) {
    this.currentCategory = $event.value; 
  }

  save() {
    let confirmationObj: ConfirmationObject = {
      save: true,
      category: this.currentCategory,
      labelName: this.name.value
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