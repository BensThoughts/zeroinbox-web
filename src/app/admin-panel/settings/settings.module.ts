import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SettingsComponent } from './components/settings.component';
import { StoreModule } from '@ngrx/store';

import { settingsReducer } from './state/settings.reducer';
import { SettingsEffects } from './state/settings.effects';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule { }
