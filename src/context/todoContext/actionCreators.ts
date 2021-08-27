import { Action, IUpdate, IRemove, ISwap, IModal, CreatedTodo } from 'types';
import {
  CREATE,
  UPDATE,
  TOGGLE_FILTER,
  REMOVE,
  SWAP,
  MODAL,
  LOAD,
} from 'context/todoContext/actionTypes';

export const create = (payload: CreatedTodo): Action => {
  return { type: CREATE, payload };
};

export const load = (): Action => ({ type: LOAD });

export const toggleFilter = (type: string, name: string): Action => ({
  type: TOGGLE_FILTER,
  payload: { type, name },
});

export const swap = (payload: ISwap): Action => ({
  type: SWAP,
  payload,
});

export const update = (payload: IUpdate): Action => {
  return {
    type: UPDATE,
    payload,
  };
};

export const remove = (payload: IRemove): Action => ({
  type: REMOVE,
  payload,
});

export const modal = (payload: IModal): Action => ({
  type: MODAL,
  payload,
});
