import { Injectable } from '@angular/core';

/*
 * [APP_PREFIX] will be applied to all parts of ngrx-store state that are placed
 * into the localStorage by this service
 */
const APP_PREFIX = 'GO-';

/**
 * [@Injectable LocalStorageService]
 * A Service to stringify and place entire ngrx-store state into localStorage
 * Also a method to retrieve the entire ngrx app-state from localStorage
 */
@Injectable()
export class LocalStorageService {
  constructor() {}

  /**
   * [loadInitialState] loads the entire state from local storage
   * @return [description]
   */
  static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map(
                (token, index) =>
                  index === 0
                    ? token
                    : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  /**
   * [setItem places a JSON object into localStorage affixed with APP_PREFIX]
   * @param  key   [The key to identify the object within localStorage]
   * @param  value [The object to place into localStorage]
   */
  setItem(key: string, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  /**
   * [getItem returns a JSON parsed object from localStorage]
   * @param  key [The localStorage key of the object to be fetched]
   * @return     [The JSON object associated with key from localStorage]
   */
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  removeItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    let retrievedValue: string;
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
