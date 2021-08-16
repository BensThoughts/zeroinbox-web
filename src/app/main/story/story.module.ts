import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './components/story/story.component';
import { MicroServicesComponent } from './components/micro-services/micro-services.component';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { TechComponent } from './components/tech/tech.component';

@NgModule({
  declarations: [StoryComponent, MicroServicesComponent, TechComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class StoryModule {}
