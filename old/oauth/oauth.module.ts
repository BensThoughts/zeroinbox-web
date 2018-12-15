import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthRoutingModule } from './oauth-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { OauthComponent } from './oauth.component';
import { UserEffects } from './user.effects';
import { userReducer } from './user.reducer';

import { environment } from '../../../environments/environment'

@NgModule({
  declarations: [OauthComponent],
  imports: [
    CommonModule,
    OauthRoutingModule,
    /// ... omitted
    AngularFireModule.initializeApp(environment.firebase, 'labelorganizer'),
    AngularFireAuthModule,

    EffectsModule.forRoot([
      UserEffects
    ]),

    StoreModule.forRoot({
      user: userReducer
    }),
  ],
})
export class OauthModule { }
