import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';
import { ManualComponent } from './components/manual/manual.component';


@NgModule({
  declarations: [ManualComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: []
})
export class ManualModule { }