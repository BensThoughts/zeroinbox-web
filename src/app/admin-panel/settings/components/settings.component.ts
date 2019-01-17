import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppState, selectSettings, SettingsChangeThemeAction } from '@app/core';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../state/settings.reducer';
import { selectSettings } from '../state/settings.selectors';
import { SettingsChangeThemeAction, SettingsChangeCountCutoffAction } from '../state/settings.actions';
import { AppState } from '@app/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  countCutoffs = [
    { value: 1, label: '1' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
  ]


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new SettingsChangeThemeAction({ theme }));
  }

  onCountCutoffSelect({ value: countCutoff }) {
    this.store.dispatch(new SettingsChangeCountCutoffAction({ countCutoff }));
  }

}
