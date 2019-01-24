import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsListComponent } from './labels-list.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '@app/core/state/core.state';

describe('LabelsListComponent', () => {
  let component: LabelsListComponent;
  let fixture: ComponentFixture<LabelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsListComponent ],
      imports: [
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
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
