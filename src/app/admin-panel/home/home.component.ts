import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations';
import { SuggestionsRequestedAction, AppState } from '@app/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation]
//  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  features: Feature[] = features;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new SuggestionsRequestedAction());
  }

}
