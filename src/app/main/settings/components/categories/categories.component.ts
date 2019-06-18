import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../state/settings.reducer';
import { selectSettings, selectCategories } from '../../state/settings.selectors';
import { SettingsChangeThemeAction, SettingsRemoveCategoryAction, SettingsAddCategoryDialogAction } from '../../state/settings.actions';
import { AppState } from '@app/core';
import { Category } from '../../state/category.model';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsCategoriesComponent implements OnInit {

  categories$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.categories$ = this.store.pipe(select(selectCategories));
  }

  removeCategory(category: Category) {
    console.log(category);
    this.store.dispatch(new SettingsRemoveCategoryAction( { category: category }));
  }

  addCategory() {
    this.store.dispatch(new SettingsAddCategoryDialogAction());
  }

}
