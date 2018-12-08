import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation]
//  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  features: Feature[] = features;

  constructor() { }

  ngOnInit() {
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
}
