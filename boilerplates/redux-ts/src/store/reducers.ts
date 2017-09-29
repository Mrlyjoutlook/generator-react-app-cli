import { combineReducers } from 'redux';
import { reducersType, injectReducerType } from './index.types';

export const makeRootReducer: reducersType = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers,
  });
};

export const injectReducer: injectReducerType = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
