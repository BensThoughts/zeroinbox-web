import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroinboxMessaageIdsComponent } from './zeroinbox-messaage-ids.component';

describe('ZeroinboxMessaageIdsComponent', () => {
  let component: ZeroinboxMessaageIdsComponent;
  let fixture: ComponentFixture<ZeroinboxMessaageIdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroinboxMessaageIdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroinboxMessaageIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
