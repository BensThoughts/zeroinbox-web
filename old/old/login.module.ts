import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login.component';

//import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';

//import { AngularFireAuthModule } from '@angular/fire/auth';

import { StoreModule } from '@ngrx/store';

import { authReducer } from './ngrx-store/login.reducer';

//import { AppModule } from '@app/app.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
  //  AppModule
  //  AngularFireModule.initializeApp(environment.firebase, 'labelorganizer'),
  //  AngularFireAuthModule,
  //  StoreModule.forFeature('auth', authReducer)
  ]
})
export class LoginModule { }
