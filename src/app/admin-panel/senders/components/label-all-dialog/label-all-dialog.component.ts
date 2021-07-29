import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectCategories } from '../../../../core/state/settings/settings.selectors';
import { AppState } from '@app/core';

export interface ConfirmationObject {
  save: boolean;
  category: string;
  labelName: string;
  filter: boolean;
}

@Component({
  selector: 'app-label-all-dialog',
  templateUrl: './label-all-dialog.component.html',
  styleUrls: ['./label-all-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelAllDialogComponent implements OnInit, OnDestroy {
  @Input() senders: ISender[];

  formGroup = new FormGroup({
    labelName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      // Validators.pattern(/^[a-z0-9]+$/i)
      Validators.pattern(/^[a-z\d\s.'&-]+$/i)
    ]),
    category: new FormControl('')
  });

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
    private ref: MatDialogRef<LabelAllDialogComponent>,
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
            labelName: '',
            category: 'NO_CATEGORY'
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.handler.unsubscribe();
  }

  save() {
    let currentLabelName = this.formGroup.get('labelName').value;
    let category = this.formGroup.get('category').value;
    let confirmationObj: ConfirmationObject = {
      save: true,
      category: category,
      labelName: currentLabelName,
      filter: false
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
