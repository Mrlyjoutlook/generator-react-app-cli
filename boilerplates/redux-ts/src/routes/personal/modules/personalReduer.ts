import { ReducerState } from '../index.types';

const initialState = {
  name: 'mrlyj',
};

export default function personalReduer(state: ReducerState = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
