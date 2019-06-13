import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@app/shared';

import { ManualComponent } from './manual/components/manual/manual.component';
import { MainHomeModule } from './main-home/main-home.module';
import { StoryComponent } from './story/story.component';
import { ContactComponent } from './contact/contact.component';
import { ManualModule } from './manual/manual.module';

@NgModule({
  declarations: [StoryComponent, ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainHomeModule,
    MainRoutingModule,
    ManualModule
  ],
  providers: []
})
export class MainModule { }
