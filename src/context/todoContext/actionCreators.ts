import { CREATE, LOAD } from './actionTypes';
import { Action, CreatedTodo } from 'types';

export const create = (payload: CreatedTodo): Action => {
  return { type: CREATE, payload };
};

export const load = (): Action => ({ type: LOAD });
