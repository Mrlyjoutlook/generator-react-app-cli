import { ReducerState } from '../index.types';

const initialState = {
  status: true,
};

export default function loginReduer(state: ReducerState = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
