import { CREATE, LOAD, UPDATE, TOGGLE_FILTER } from './actionTypes';
import { ITodo, Action, CreatedTodo } from 'types';

export const create = (payload: CreatedTodo): Action => {
  return { type: CREATE, payload };
};

export const load = (): Action => ({ type: LOAD });

export const update = (payload: ITodo): Action => ({ type: UPDATE, payload });

export const toggleFilter = (type: string, name: string): Action => ({
  type: TOGGLE_FILTER,
  payload: { type, name },
});
