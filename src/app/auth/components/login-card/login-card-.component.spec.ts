import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginCardComponent } from './login-card.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '@app/core/state/core.state';

describe('LoginPageComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginCardComponent],
        imports: [StoreModule.forRoot({ ...fromRoot.reducers }), SharedModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
