import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLabelSendersComponent } from './manual-label-senders.component';

describe('ManualLabelSendersComponent', () => {
  let component: ManualLabelSendersComponent;
  let fixture: ComponentFixture<ManualLabelSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualLabelSendersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLabelSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
