import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../state/settings.reducer';
import { selectSettings } from '../../state/settings.selectors';
import { SettingsChangeThemeAction } from '../../state/settings.actions';
import { AppState } from '@app/core';
import { faThemeco } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-settings-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsThemeComponent implements OnInit {
  // settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'light' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  @Input() theme;


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.settings$ = this.store.pipe(select(selectSettings));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new SettingsChangeThemeAction({ theme }));
  }

}
