import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './components/story/story.component';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { TechComponent } from './components/tech/tech.component';
import { ZeroinboxWebComponent } from './components/zeroinbox-web/zeroinbox-web.component';
import { ZeroinboxApiGatewayComponent } from './components/zeroinbox-api-gateway/zeroinbox-api-gateway.component';
import { ZeroinboxMessaageIdsComponent } from './components/zeroinbox-messaage-ids/zeroinbox-messaage-ids.component';
import { ZeroinboxBatchMessagesComponent } from './components/zeroinbox-batch-messages/zeroinbox-batch-messages.component';
import { ZeroinboxActionsComponent } from './components/zeroinbox-actions/zeroinbox-actions.component';
import { ZerorabbitComponent } from './components/zerorabbit/zerorabbit.component';

@NgModule({
  declarations: [
    StoryComponent,
    TechComponent,
    ZeroinboxWebComponent,
    ZeroinboxApiGatewayComponent,
    ZeroinboxMessaageIdsComponent,
    ZeroinboxBatchMessagesComponent,
    ZeroinboxActionsComponent,
    ZerorabbitComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class StoryModule {}
