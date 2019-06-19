import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '@app/core/state/settings/settings.reducer';
import { selectSettings } from '@app/core/state/settings/settings.selectors';
import { SettingsChangeThemeAction } from '@app/core/state/settings/settings.actions';
import { AppState } from '@app/core';
import { selectIsBootstrapped } from '../../../../core/state/bootstrap/bootstrap.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  settings$: Observable<SettingsState>;
  isBootstrapped$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
    this.isBootstrapped$ = this.store.pipe(select(selectIsBootstrapped));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new SettingsChangeThemeAction({ theme }));
  }

}
