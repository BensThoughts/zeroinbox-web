import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@app/shared';


import { ManualComponent } from './manual/manual.component';
import { MainHomeModule } from './main-home/main-home.module';
import { MainHomeComponent } from './main-home/components/main-home/main-home.component';

@NgModule({
  declarations: [ManualComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainHomeModule,
    MainRoutingModule
  ],
  providers: []
})
export class MainModule { }
