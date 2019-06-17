import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';
import { MessageViewerComponent } from './components/message-viewer/message-viewer.component';


@NgModule({
  declarations: [MessageViewerComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: []
})
export class MessageViewerModule { }