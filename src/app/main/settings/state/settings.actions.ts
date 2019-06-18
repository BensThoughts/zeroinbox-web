import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  ChangeTheme = '[Settings Theme Component] Change Theme',
  AddCategory = '[Settings Categories Component] Add Category',
  RemoveCategory = '[Settings Categories Component] Remove Category',
  UpdateSettingsState = '[Settings Effects] Update Settings State From Another Tab/Window',
}

export class SettingsChangeThemeAction implements Action {
  readonly type = SettingsActionTypes.ChangeTheme;

  constructor(public payload: { theme: string }) {}
}

export class SettingsAddCategoryAction implements Action {
  readonly type = SettingsActionTypes.AddCategory;
  constructor(public payload: { category: { name: string, value: string } }) {}
}

export class SettingsRemoveCategoryAction implements Action {
  readonly type = SettingsActionTypes.RemoveCategory;
  constructor(public payload: { category: { name: string, value: string } }) {}
}

export class UpdateSettingsStateAction implements Action {
  readonly type = SettingsActionTypes.UpdateSettingsState;

  constructor(public payload: any) {}
}


export type SettingsActions =
  | SettingsChangeThemeAction

  | SettingsAddCategoryAction
  | SettingsRemoveCategoryAction
  
  | UpdateSettingsStateAction
