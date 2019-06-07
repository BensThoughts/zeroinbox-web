import { Action } from '@ngrx/store';
import { ISender } from '@app/core/state/senders/model/senders.model';

export enum SubscriptionsActionTypes {
  UnsubscribeDialog = '[Subscriptions Component] Unsubscribe Dialog',

  UnsubscribeSenderRequest = '[Subscriptions Effects] Unsubscribe Sender Request',
  UnsubscribeRequestSuccess = '[Subscriptions Effects] Unsubscribe Request Success',
  UnsubscribeRequestFailure = '[Subscriptions Effects] Unsubscribe Request Failure',
}

export class UnsubscribeDialogAction implements Action {
  readonly type = SubscriptionsActionTypes.UnsubscribeDialog;

  constructor(public payload: { sender: ISender }) {}
}

export class UnsubscribeSenderRequestAction implements Action {
  readonly type = SubscriptionsActionTypes.UnsubscribeSenderRequest;

  constructor(public payload: { sender: ISender }) {}
}

export class UnsubscribeRequestSuccessAction implements Action {
  readonly type = SubscriptionsActionTypes.UnsubscribeRequestSuccess;
}

export class UnsubscribeRequestFailureAction implements Action {
  readonly type = SubscriptionsActionTypes.UnsubscribeRequestFailure;
}

export type SubscriptionsActions = 
  | UnsubscribeDialogAction
  | UnsubscribeSenderRequestAction
  | UnsubscribeRequestSuccessAction
  | UnsubscribeRequestFailureAction 