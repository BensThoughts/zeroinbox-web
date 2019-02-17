import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsByGroupComponent } from './suggestions-by-group.component';

describe('SuggestionsByGroupComponent', () => {
  let component: SuggestionsByGroupComponent;
  let fixture: ComponentFixture<SuggestionsByGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
