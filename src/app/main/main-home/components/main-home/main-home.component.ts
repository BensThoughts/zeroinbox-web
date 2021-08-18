import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fadeElementsAnimation } from '../../animations/elementsAnimations';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeElementsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHomeComponent {
  constructor() {}
}
