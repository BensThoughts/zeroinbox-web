import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBulkActionsComponent } from './manual-bulk-actions.component';

describe('ManualBulkActionsComponent', () => {
  let component: ManualBulkActionsComponent;
  let fixture: ComponentFixture<ManualBulkActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualBulkActionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBulkActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
