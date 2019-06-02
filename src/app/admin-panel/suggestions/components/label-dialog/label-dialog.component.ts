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

  formGroup = new FormGroup({
    labelName: new FormControl(''),
    category: new FormControl('')
  })

  categories = [
    { name: 'No Category', value: 'NO_CATEGORY'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Friends', value: 'Friends'},
    { name: 'Work', value: 'Work'}
  ]

  constructor(
    private ref: MatDialogRef<LabelDialogComponent>,
    ) { }


  ngOnInit() {
    this.formGroup.setValue({
      labelName: this.sender.fromName,
      category: 'NO_CATEGORY'
    });
  }

  save() {
    let currentLabelName = this.formGroup.get('labelName').value;
    let category = this.formGroup.get('category').value;
    let confirmationObj: ConfirmationObject = {
      save: true,
      category: category,
      labelName: currentLabelName
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