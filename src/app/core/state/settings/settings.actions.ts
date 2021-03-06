import { Action } from '@ngrx/store';
import { Category } from './category.model';

export enum SettingsActionTypes {
  ChangeTheme = '[Settings Theme Component] Change Theme',

  GetCategoriesRequest = '[Settings Categories Component] Get Categories Request',
  GetCategoriesRequestSuccess = '[Settings Effects] Get Categories Request Success',
  GetCategoriesRequestFailure = '[Settings Effects] Get Categories Request Failure',

  SetCategoriesRequest = '[Settings Categories Component] Set Categories Request',
  SetCategoriesRequestSuccess = '[Settings Effects] Set Categories Request Success',
  SetCategoriesRequestFailure = '[Settings Effects] Set Categories Request Failure',

  SetCategories = '[Settings Effects] Set Categories',
  AddCategory = '[Settings Categories Component] Add Category',
  RemoveCategory = '[Settings Categories Component] Remove Category',

  UpdateSettingsState = '[Settings Effects] Update Settings State From Another Tab/Window',
  ResetSettingsState = '[Auth Effects] Reset Settings State'
}

export class SettingsChangeThemeAction implements Action {
  readonly type = SettingsActionTypes.ChangeTheme;

  constructor(public payload: { theme: string }) {}
}

export class SettingsGetCategoriesRequestAction implements Action {
  readonly type = SettingsActionTypes.GetCategoriesRequest;
}

export class SettingsGetCategoriesRequestSuccessAction implements Action {
  readonly type = SettingsActionTypes.GetCategoriesRequestSuccess;
}

export class SettingsGetCategoriesRequestFailureAction implements Action {
  readonly type = SettingsActionTypes.GetCategoriesRequestFailure;
}

export class SettingsSetCategoriesRequestAction implements Action {
  readonly type = SettingsActionTypes.SetCategoriesRequest;
  constructor(public payload: { add: boolean; category: Category }) {}
}

export class SettingsSetCategoriesRequestSuccessAction implements Action {
  readonly type = SettingsActionTypes.SetCategoriesRequestSuccess;
}

export class SettingsSetCategoriesRequestFailureAction implements Action {
  readonly type = SettingsActionTypes.SetCategoriesRequestFailure;
}

export class SettingsSetCategoriesAction implements Action {
  readonly type = SettingsActionTypes.SetCategories;
  constructor(public payload: { categories: Category[] }) {}
}
export class SettingsAddCategoryAction implements Action {
  readonly type = SettingsActionTypes.AddCategory;
  constructor(public payload: { category: Category }) {}
}

export class SettingsRemoveCategoryAction implements Action {
  readonly type = SettingsActionTypes.RemoveCategory;
  constructor(public payload: { category: Category }) {}
}

export class UpdateSettingsStateAction implements Action {
  readonly type = SettingsActionTypes.UpdateSettingsState;

  constructor(public payload: any) {}
}

export class ResetSettingsStateAction implements Action {
  readonly type = SettingsActionTypes.ResetSettingsState;
}

export type SettingsActions =
  | SettingsChangeThemeAction
  | SettingsGetCategoriesRequestAction
  | SettingsGetCategoriesRequestSuccessAction
  | SettingsGetCategoriesRequestFailureAction
  | SettingsSetCategoriesRequestAction
  | SettingsSetCategoriesRequestSuccessAction
  | SettingsSetCategoriesRequestFailureAction
  | SettingsSetCategoriesAction
  | SettingsAddCategoryAction
  | SettingsRemoveCategoryAction
  | UpdateSettingsStateAction
  | ResetSettingsStateAction;
