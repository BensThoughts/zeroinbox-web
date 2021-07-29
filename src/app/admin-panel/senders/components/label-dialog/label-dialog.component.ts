import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectCategories } from '../../../../core/state/settings/settings.selectors';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface ConfirmationObject {
  save: boolean;
  category: string;
  labelName: string;
  filter: boolean;
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
  });

  filter: boolean = true;

  categories = [
    { name: 'No Category', value: 'NO_CATEGORY' },
    { name: 'Friends', value: 'Friends' },
    { name: 'Shopping', value: 'Shopping' },
    { name: 'News', value: 'News' },
    { name: 'Work', value: 'Work' },
    { name: 'Finance', value: 'Finance' },
    { name: 'Travel', value: 'Travel' },
    { name: 'Misc', value: 'Misc' }
  ];

  handler: Subscription;

  constructor(
    private ref: MatDialogRef<LabelDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.handler = this.store
      .pipe(
        select(selectCategories),
        map((categories) => {
          this.categories = [
            { name: 'No Category', value: 'NO_CATEGORY' },
            ...categories
          ];
          this.formGroup.setValue({
            labelName: this.sender.fromName,
            category: 'NO_CATEGORY'
          });
        })
      )
      .subscribe();
  }

  ngOnDestory() {
    this.handler.unsubscribe();
  }

  filterChecked() {
    this.filter = !this.filter;
  }

  save() {
    let currentLabelName = this.formGroup.get('labelName').value;
    let category = this.formGroup.get('category').value;
    let confirmationObj: ConfirmationObject = {
      save: true,
      category: category,
      labelName: currentLabelName,
      filter: this.filter
    };
    this.ref.close(confirmationObj);
  }

  cancel() {
    let confirmationObj: ConfirmationObject = {
      save: false,
      category: '',
      labelName: '',
      filter: false
    };
    this.ref.close(confirmationObj);
  }
}
