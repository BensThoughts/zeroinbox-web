import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroinboxActionsComponent } from './zeroinbox-actions.component';

describe('ZeroinboxActionsComponent', () => {
  let component: ZeroinboxActionsComponent;
  let fixture: ComponentFixture<ZeroinboxActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroinboxActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroinboxActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
