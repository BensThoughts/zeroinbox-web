import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '@app/core/state/settings/settings.reducer';
import { selectSettings, selectCategories } from '@app/core/state/settings/settings.selectors';
import {
  SettingsRemoveCategoryAction, SettingsSetCategoriesRequestAction, 
} from '@app/core/state/settings/settings.actions';
import { AppState } from '@app/core';
import { Category } from '@app/core/state/settings/category.model';
import { MatDialog } from '@angular/material';
import { AddCategoryDialogComponent, CategoryConfirmationObject } from '../add-category-dialog/add-category-dialog.component';
import { SettingsAddCategoryAction, SettingsGetCategoriesRequestAction, SettingsSetCategoriesAction } from '../../../../core/state/settings/settings.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsCategoriesComponent implements OnInit {

  categories$;

  constructor(
    private store: Store<AppState>,
    private dialogService: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(new SettingsGetCategoriesRequestAction());
    this.categories$ = this.store.pipe(select(selectCategories));
  }

  removeCategory(category: Category) {
    console.log(category);
    this.store.dispatch(new SettingsSetCategoriesRequestAction({ add: false, category: category }))
    // this.store.dispatch(new SettingsRemoveCategoryAction( { category: category }));
  }

  addCategory() {
    // this.store.dispatch(new SettingsAddCategoryDialogAction());
    let dialoagRef = this.dialogService.open(AddCategoryDialogComponent);
    dialoagRef
    .afterClosed()
    .pipe(
        map((confirmationObject: CategoryConfirmationObject) => {
          if (confirmationObject === undefined || !confirmationObject.save) {
            // Do nothing
          } else {
            let category = confirmationObject.category;
            // console.log(confirmationObject.category);
            // console.log(confirmationObject.labelName);
            // this.store.dispatch(new SettingsAddCategoryAction({ category: confirmationObject.category }))
            this.store.dispatch(new SettingsSetCategoriesRequestAction({ add: true, category: category}))
          }
        })
    ).subscribe();
  
  }

}
