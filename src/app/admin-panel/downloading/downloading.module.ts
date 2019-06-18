import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '@app/shared';
import { DownloadingComponent } from './components/downloading/downloading.component';
import { SharedComponentModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [DownloadingComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedComponentModule
  ],
})
export class DownloadingModule { }