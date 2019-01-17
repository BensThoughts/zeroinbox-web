import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsTableComponent } from './suggestions-table.component';

describe('SuggestionsTableComponent', () => {
  let component: SuggestionsTableComponent;
  let fixture: ComponentFixture<SuggestionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsTableComponent ]
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
