import {Action} from '@ngrx/store';

export enum SuggestedActionTypes {
  CollectInboxMessageIds = '[Labels] Collect Inbox Message Ids',
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */
export class CollectInboxMessageIds implements Action {
  readonly type = SuggestedActionTypes.CollectInboxMessageIds;
}

export type SuggestedActions =
  CollectInboxMessageIds
