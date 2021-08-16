import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroinboxWebComponent } from './zeroinbox-web.component';

describe('ZeroinboxWebComponent', () => {
  let component: ZeroinboxWebComponent;
  let fixture: ComponentFixture<ZeroinboxWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroinboxWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroinboxWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
