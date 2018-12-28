import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPromptComponent } from './logout-prompt.component';

describe('LogoutPromptComponent', () => {
  let component: LogoutPromptComponent;
  let fixture: ComponentFixture<LogoutPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
