import { CREATE, LOAD, SWAP, TOGGLE_FILTER, UPDATE } from './actionTypes';
import { Action, CreatedTodo } from 'types';

export const create = (payload: CreatedTodo): Action => {
  return { type: CREATE, payload };
};

export const load = (): Action => ({ type: LOAD });

export const toggleFilter = (type: string, name: string): Action => ({
  type: TOGGLE_FILTER,
  payload: { type, name },
});

export const swap = (first: number, second: number): Action => ({
  type: SWAP,
  payload: { first, second },
});

export const update = (payload: {}): Action => {
  return {
    type: UPDATE,
    payload,
  };
};
