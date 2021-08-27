import { Action, CreatedTodo, RemoveTodoType } from 'types';
import {
  CREATE,
  LOAD,
  UPDATE,
  TOGGLE_FILTER,
  REMOVE,
  SWAP,
  MODAL,
} from 'context/todoContext/actionTypes';

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

export const remove = (payload: RemoveTodoType): Action => ({
  type: REMOVE,
  payload,
});

export const modal = (payload: { text: string; id?: number; message?: string }): Action => ({
  type: MODAL,
  payload,
});
