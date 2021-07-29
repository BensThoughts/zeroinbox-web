import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '@app/core/state/settings/settings.reducer';
import { selectSettings } from '@app/core/state/settings/settings.selectors';
import { SettingsChangeThemeAction } from '@app/core/state/settings/settings.actions';
import { AppState } from '@app/core';

@Component({
  selector: 'app-settings-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsThemeComponent {
  //// settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'light' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  @Input() theme;

  constructor(private store: Store<AppState>) { }

  //TODO: Re-Enable detection of current theme setting?
  //// ngOnInit() {
  //// this.settings$ = this.store.pipe(select(selectSettings));
  //// }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new SettingsChangeThemeAction({ theme }));
  }

}
