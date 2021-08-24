import { CREATE, LOAD, REMOVE, UPDATE } from "./actionTypes";
import { Action } from "types/context";
import { TCategory } from 'types';

export const create =
  (payload: {text: string, due: Date, category: TCategory}): Action => ({ 
    type: CREATE,
    payload 
});

export const load = (): Action => ({type: LOAD});

export const remove = (payload: {}): Action => ({ type: REMOVE, payload });

export const update = (payload: {}): Action => {
  return {
    type: UPDATE,
    payload
  }
};