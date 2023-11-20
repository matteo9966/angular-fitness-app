//call store function only inside an injection context (where signals can be called!)
// continue after checking out ngrx 
import {
    Injectable,
    inject,
    signal,
    computed,
    Signal,
    effect,
  } from '@angular/core';
import { createAction } from './actions/actionCreator';
type ReducerType = <S>(state: S, action: ReturnType<typeof createAction>) => S;
const createStore = <StateType>(rootReducer: ReducerType) => {
  const store = signal(null) 
  
  const that = this;
  return {

  };
};
