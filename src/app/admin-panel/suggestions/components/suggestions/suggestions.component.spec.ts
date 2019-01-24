import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsComponent } from './suggestions.component';
import { SharedModule } from '@app/shared';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '@app/core/state/core.state';
import * as fromFeature from '../../state/suggestions.reducer';
import { SuggestionsTableComponent } from '../suggestions-table/suggestions-table.component';


describe('SuggestionsComponent', () => {
  let component: SuggestionsComponent;
  let fixture: ComponentFixture<SuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsComponent, SuggestionsTableComponent ],
      imports: [
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromFeature.suggestionsReducer)
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
