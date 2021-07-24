import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import * as fromRoot from '@app/core/state/core.state';
import { StoreModule, Store } from '@ngrx/store';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {} from 'jasmine'; // Importing this in this one module seems to solve
                          // the issue of finding the jasmine types in every
                          // other

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromRoot.AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({...fromRoot.reducers}),
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();


    }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Zero-Inbox'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Zero-Inbox');
  });

/**
  it('should display hidden menu items when logged in', () => {

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    const action = new fromAuthActions.LoginCompleteAction();

    store.dispatch(action);

    component.isLoggedIn$.subscribe(loggedIn => {
      expect(loggedIn).toBe(true);
    });

  });
**/

});
