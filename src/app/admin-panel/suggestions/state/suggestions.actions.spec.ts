import * as fromSuggestionsActions from "./suggestions.actions";
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';

describe('LoadSuggestionsAction', () => {
  it('should create an action', () => {

    const payload: { suggestions: ISuggestion[] } = {
      suggestions: [{
        id: '123456789abc',
        fromAddress: 'test@gmail.com',
        fromName: 'test',
        count: 123,
        totalSizeEstimate: 123
      }]
    };

    const action = new fromSuggestionsActions.LoadSuggestionsAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.LoadSuggestions,
      payload
    });

  });
});


describe('DeleteSuggestionsAction', () => {
  it('should create an action', () => {
    const payload = {
      ids: [
        '123456789abc',
        '987654321cba'
      ]
    }
    const action = new fromSuggestionsActions.DeleteSuggestionsAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.DeleteSuggestions,
      payload
    })
  });
});

describe('DeleteSuggestionsMetaAction', () => {
  it('should create an action', () => {
    const payload = {
      ids: [
        '123456789abc',
        '987654321cba'
      ]
    }
    const action = new fromSuggestionsActions.DeleteSuggestionsMetaAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.DeleteSuggestionsMeta,
      payload
    })
  });
});

describe('LabelByNameSuggestionsAction', () => {
  it('should create an action', () => {
    const payload = {
      ids: [
        '123456789abc',
        '987654321cba'
      ]
    }
    const action = new fromSuggestionsActions.LabelByNameSuggestionsAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.LabelByNameSuggestions,
      payload
    })
  });
});

describe('UpdateSuggestionsAction', () => {
  it('should create an action', () => {
    let payload: { suggestions: Update<ISuggestion>[] };
    const action = new fromSuggestionsActions.UpdateSuggestionsAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.UpdateSuggestions,
      payload
    })
  });
});

describe('SetCutoffAction', () => {
  it('should create an action', () => {
    let payload: { cutoff: number };
    const action = new fromSuggestionsActions.SetCutoffAction(payload);

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.SetCutoff,
      payload
    })
  });
});

describe('ResetSuggestionsStateAction', () => {
  it('should create an action', () => {
    const action = new fromSuggestionsActions.ResetSuggestionsStateAction();

    expect({...action}).toEqual({
      type: fromSuggestionsActions.SuggestionsActionTypes.ResetSuggestions,
    })
  });
});