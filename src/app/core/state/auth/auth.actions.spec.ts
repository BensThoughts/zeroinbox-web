import * as fromAuthActions from "./auth.actions";

describe('LoginRequestedAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LoginRequestedAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LoginRequested })

  });
});


describe('LoginCompleteAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LoginCompleteAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LoginComplete })
  });
});


describe('LoginSuccessAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LoginSuccessAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LoginSuccess })
  });
});

describe('LoginFailureAction', () => {
  it('should create an action', () => {
    let payload: any;
    const action = new fromAuthActions.LoginFailureAction(payload);

    expect({...action}).toEqual({
      type: fromAuthActions.AuthActionTypes.LoginFailure,
      payload
     })

  });
});

describe('LogoutAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LogoutAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.Logout })

  });
});

describe('LogoutConfirmedAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LogoutConfirmedAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LogoutConfirmed })

  });
});

describe('LogoutCancelledAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LogoutCancelledAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LogoutCancelled })

  });
});

describe('LogoutConfirmedFromOtherWindowAction', () => {
  it('should create an action', () => {
    const action = new fromAuthActions.LogoutConfirmedFromOtherWindowAction();

    expect({...action}).toEqual({ type: fromAuthActions.AuthActionTypes.LogoutConfirmedFromOtherWindow })

  });
});
