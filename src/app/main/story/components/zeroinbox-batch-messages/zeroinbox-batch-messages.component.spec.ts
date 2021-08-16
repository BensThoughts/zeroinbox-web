import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroinboxBatchMessagesComponent } from './zeroinbox-batch-messages.component';

describe('ZeroinboxBatchMessagesComponent', () => {
  let component: ZeroinboxBatchMessagesComponent;
  let fixture: ComponentFixture<ZeroinboxBatchMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroinboxBatchMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroinboxBatchMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
