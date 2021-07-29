import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared';

import * as fromRoot from '@app/core/state/core.state';

import { StoreModule } from '@ngrx/store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [
          SharedModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
