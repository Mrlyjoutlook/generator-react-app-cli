import { combineReducers, Store } from 'redux';

export interface ReducerObj {
  key: string;
  reducer: () => {};
}

export interface StoreObj extends Store<object> {
  asyncReducers: object;
}

const makeRootReducer = (asyncReducers: object) => {
  return combineReducers({
    ...asyncReducers,
  });
};

export const injectReducer = (store: StoreObj, reducerObj: ReducerObj) => {
  // if (Object.hasOwnProperty.call(store.asyncReducers, reducerObj.key)) return;
  store.asyncReducers[reducerObj.key] = reducerObj.reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
