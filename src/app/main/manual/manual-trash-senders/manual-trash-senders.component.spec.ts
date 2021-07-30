import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTrashSendersComponent } from './manual-trash-senders.component';

describe('ManualTrashSendersComponent', () => {
  let component: ManualTrashSendersComponent;
  let fixture: ComponentFixture<ManualTrashSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualTrashSendersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualTrashSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
