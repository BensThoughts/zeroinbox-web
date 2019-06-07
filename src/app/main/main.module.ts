import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@app/shared';

import { ManualComponent } from './manual/manual.component';
import { MainHomeModule } from './main-home/main-home.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [ManualComponent, AboutComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainHomeModule,
    MainRoutingModule
  ],
  providers: []
})
export class MainModule { }
