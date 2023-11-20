import type { Action } from "../actions/Action.type";
export function combineReducers<S>(
    ...reducers: ((state: S, action: Action) => S)[]
  ) {
    return (state: S, action: Action) => {
      return reducers.reduce((currentState, reducer) => {
        return reducer(currentState, action);
      }, state);
    };
  }