import { CREATE, LOAD, TOGGLE_FILTER, REMOVE } from './actionTypes';
import { Action, CreatedTodo, RemoveTodoType } from 'types';

export const create = (payload: CreatedTodo): Action => {
  return { type: CREATE, payload };
};

export const load = (): Action => ({ type: LOAD });

export const toggleFilter = (type: string, name: string): Action => ({
  type: TOGGLE_FILTER,
  payload: { type, name },
});

export const remove = (payload: RemoveTodoType): Action => ({
  type: REMOVE,
  payload,
});
