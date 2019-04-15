import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTableComponent } from './label-table.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '@app/core/state/core.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LabelTableComponent', () => {
  let component: LabelTableComponent;
  let fixture: ComponentFixture<LabelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTableComponent ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
