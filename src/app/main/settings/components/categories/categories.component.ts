import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../state/settings.reducer';
import { selectSettings } from '../../state/settings.selectors';
import { SettingsChangeThemeAction } from '../../state/settings.actions';
import { AppState } from '@app/core';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsCategoriesComponent implements OnInit {

  categories = [
    { name: 'Friends', value: 'Friends'},
    { name: 'Shopping', value: 'Shopping'},
    { name: 'News', value: 'News'},
    { name: 'Work', value: 'Work'},
    { name: 'Finance', value: 'Finance'},
    { name: 'Travel', value: 'Travel'},
    { name: 'Misc', value: 'Misc'},
  ]

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

}
