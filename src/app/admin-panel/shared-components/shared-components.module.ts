import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [MessageViewerComponent, UserCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [MessageViewerComponent, UserCardComponent]
})
export class SharedComponentModule {}
