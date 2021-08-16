import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZerorabbitComponent } from './zerorabbit.component';

describe('ZerorabbitComponent', () => {
  let component: ZerorabbitComponent;
  let fixture: ComponentFixture<ZerorabbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZerorabbitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZerorabbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
