import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsListComponent } from './labels-list.component';

describe('LabelsListComponent', () => {
  let component: LabelsListComponent;
  let fixture: ComponentFixture<LabelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
