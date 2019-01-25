import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBarchartComponent } from './stats-barchart.component';

describe('StatsBarchartComponent', () => {
  let component: StatsBarchartComponent;
  let fixture: ComponentFixture<StatsBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
