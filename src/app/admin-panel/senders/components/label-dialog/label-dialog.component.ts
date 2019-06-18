import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

export class LabelDialogComponent implements OnInit {

  @Input() sender: ISender;

  formGroup = new FormGroup({
    labelName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      // Validators.pattern(/^[a-z0-9]+$/i)
      Validators.pattern(/^[a-z\d\s.'&-]+$/i)
    ]),
    category: new FormControl('')
  })

  categories = [
    { name: 'No Category', value: 'NO_CATEGORY'},
    { name: 'Friends', value: 'Friends'},
    { name: 'Shopping', value: 'Shopping'},
    { name: 'News', value: 'News'},
    { name: 'Work', value: 'Work'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Misc', value: 'Misc'},
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