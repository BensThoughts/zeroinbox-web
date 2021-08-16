import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { tech_stack } from './tech';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryComponent {
  public tech_stack;
  constructor() {
    this.tech_stack = tech_stack;
  }
}
