import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '@app/core/state/core.state';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SettingsComponent],
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
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
