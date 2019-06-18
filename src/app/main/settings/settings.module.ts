import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SettingsComponent } from './components/settings/settings.component';
import { StoreModule } from '@ngrx/store';

import { settingsReducer } from './state/settings.reducer';
import { SettingsEffects } from './state/settings.effects';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { SettingsThemeComponent } from './components/theme/theme.component';
import { SettingsCategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [SettingsComponent, SettingsThemeComponent, SettingsCategoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule { }
