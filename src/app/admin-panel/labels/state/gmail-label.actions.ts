import {Action} from '@ngrx/store';
import {IGmailLabel} from './models/gmail-label.model';
import {Update} from '@ngrx/entity';

export enum GmailLabelActionTypes {
  GmailLabelsRequested = '[Labels Page] All Gmail Labels Requested',
  GmailLabelsLoaded = '[Gmail Labels API] Gmail Labels Loaded',
  GmailLabelsLoadFailure = '[Gmail Labels API] Gmail Labels Load Failure',
  GmailLabelsRemovedByAuth = '[Auth Effects] Gmail Labels Removed',
  GmailLabelsAdded = '[Labels Input Component] Gmail Labels Added',
  GmailLabelRemoved = '[Labels List Component] Gmail Label Removed',
  GmailLabelRequested = '[Labels Page] Gmail Label Requested',
  GmailLabelSaved = '[Edit Label Dialog] Gmail Label Saved',
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */
export class GmailLabelsRequested implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelsRequested;
}

/**
 * [return all gmail labels from the Gmail Label API as IGmailLabel[]]
 * @param payload: { gmailLabel: IGmailLabel[] } [array of all gmail labels]
 */
export class GmailLabelsLoaded implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelsLoaded;
  constructor(public payload: { gmailLabels: IGmailLabel[] }) {

  }
}

/**
 * [return all gmail labels from the Gmail Label API as IGmailLabel[]]
 * @param payload: { gmailLabel: IGmailLabel[] } [array of all gmail labels]
 */
export class GmailLabelsLoadFailure implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelsLoadFailure;
  constructor(public payload: any) {

  }
}

/**
 * [remove all gmail labels from the store as requested by logout in auth effects]
 */
export class GmailLabelsRemovedByAuth implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelsRemovedByAuth;
}

/**
 * [return gmail labels added from label-input component
 * @param payload: { gmailLabel: IGmailLabel[] } [array of gmail labels]
 */
export class GmailLabelsAdded implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelsAdded;
  constructor(public payload: { gmailLabels: IGmailLabel[] }) {

  }
}

/**
 * [delete a gmail label from the state]
 * @param payload: { name: string } [the name of the label to delete]
 */
export class GmailLabelRemoved implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelRemoved;
  constructor(public payload: { name: string }) {

  }
}

/**
 * [request a single gmail label from the store]
 * @param payload: { name: string } [the name of the label requested]
 */
export class GmailLabelRequested implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelRequested;
  constructor(public payload: { name: string }) {

  }
}

/**
 * [Update a label in the store]
 * @param payload: { gmailLabel: Update<IGmailLabel> } [the updated gmail label]
 */
export class GmailLabelSaved implements Action {
  readonly type = GmailLabelActionTypes.GmailLabelSaved;
  constructor(public payload: { gmailLabel: Update<IGmailLabel> }) {

  }
}

export type GmailLabelActions =
  GmailLabelsRequested
  | GmailLabelsLoaded
  | GmailLabelsLoadFailure
  | GmailLabelsRemovedByAuth
  | GmailLabelsAdded
  | GmailLabelRemoved
  | GmailLabelRequested
  | GmailLabelSaved;
