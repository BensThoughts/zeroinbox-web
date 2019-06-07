import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthRoutingModule } from './auth-routing.module';
import { LogoutPromptComponent } from './components/logout-prompt/logout-prompt.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DownloadingComponent } from './components/downloading/downloading.component';

@NgModule({
  declarations: [LoadingComponent, DownloadingComponent, LogoutPromptComponent],
  entryComponents: [LogoutPromptComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  providers: []
})
export class AuthModule { }
