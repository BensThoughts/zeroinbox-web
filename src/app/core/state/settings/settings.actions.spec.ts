import * as fromSettingsActions from './settings.actions';

describe('SettingsChangeThemeAction', () => {
  it('should create an action', () => {
    const payload = {
      theme: 'DEFAULT-THEME'
    }
    const action = new fromSettingsActions.SettingsChangeThemeAction(payload);

    expect({...action}).toEqual({
      type: fromSettingsActions.SettingsActionTypes.ChangeTheme,
      payload
    })
  });
});
