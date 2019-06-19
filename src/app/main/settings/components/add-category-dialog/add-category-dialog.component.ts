import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../core/state/settings/category.model';

export interface CategoryConfirmationObject {
  save: boolean;
  category: Category;
}

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddCategoryDialogComponent implements OnInit {

  formGroup = new FormGroup({
    categoryName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      // Validators.pattern(/^[a-z0-9]+$/i)
      Validators.pattern(/^[a-z\d\s.'&-]+$/i)
    ]),
  })



  constructor(
    private ref: MatDialogRef<AddCategoryDialogComponent>,
    ) { }


  ngOnInit() {
    this.formGroup.setValue({
      categoryName: '',
    });
  }

  save() {
    let currentCategoryName = this.formGroup.get('categoryName').value;
    let category: Category = {
      name: currentCategoryName,
      value: currentCategoryName
    }
    let confirmationObj: CategoryConfirmationObject = {
      save: true,
      category: category
    }
    this.ref.close(confirmationObj);
  }

  cancel() {
    let confirmationObj: CategoryConfirmationObject = {
      save: false,
      category: { name: '', value: '' }
    }
    this.ref.close(confirmationObj);
  }

}