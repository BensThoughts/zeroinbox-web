import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroServicesComponent } from './micro-services.component';

describe('MicroServicesComponent', () => {
  let component: MicroServicesComponent;
  let fixture: ComponentFixture<MicroServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
