import { CREATE, LOAD } from './actionTypes';
import { Action, CreateTodoDto } from 'types';

export const create = (createTodoDto: CreateTodoDto): Action => {
  const payload = createTodoDto;
  return { type: CREATE, payload };
};
export const load = (): Action => ({ type: LOAD });
