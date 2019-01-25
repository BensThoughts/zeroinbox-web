import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsBySizeComponent } from './suggestions-by-size.component';

describe('SuggestionsBySizeComponent', () => {
  let component: SuggestionsBySizeComponent;
  let fixture: ComponentFixture<SuggestionsBySizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsBySizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsBySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
