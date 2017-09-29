import { Store, Reducer } from 'redux';

export interface ReducerObj {
  key: string;
  reducer: () => void;
}

export interface CombStore {
  store: object;
  runSaga: (...items: any[]) => void;
}

export interface StoreObj extends Store<any> {
  asyncReducers?: object;
}

export type createStoreType<S> = (initialState: S) => CombStore;

export type reducersType = (asyncReducers: object) => Reducer<object>;

export type injectReducerType = (store: StoreObj, reducerObj: ReducerObj) => void;
