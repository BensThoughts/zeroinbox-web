import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
