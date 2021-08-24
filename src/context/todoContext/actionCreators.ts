import { CREATE, LOAD, UPDATE } from './actionTypes';
import { Action, CreateTodoDto } from 'types/context';
import { ITodo } from 'types';

export const create = (createTodoDto: CreateTodoDto): Action => {
  const payload = createTodoDto;
  return { type: CREATE, payload };
};
export const load = (): Action => ({ type: LOAD });

export const update = (payload: ITodo): Action => ({ type: UPDATE, payload });
