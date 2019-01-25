import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppState, selectSettings, SettingsChangeThemeAction } from '@app/core';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../state/settings.reducer';
import { selectSettings } from '../state/settings.selectors';
import { SettingsChangeThemeAction } from '../state/settings.actions';
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



  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new SettingsChangeThemeAction({ theme }));
  }

}
