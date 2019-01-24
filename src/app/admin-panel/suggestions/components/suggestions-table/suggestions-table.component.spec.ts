import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsTableComponent } from './suggestions-table.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '@app/core/state/core.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SuggestionsTableComponent', () => {
  let component: SuggestionsTableComponent;
  let fixture: ComponentFixture<SuggestionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsTableComponent ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
