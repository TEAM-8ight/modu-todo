import { CREATE, LOAD, REMOVE, UPDATE } from "./actionTypes";
import { Action, CreateTodoDto } from "types/context";

export const create = (createTodoDto: CreateTodoDto): Action => {
  const payload = createTodoDto;
  return { type: CREATE, payload }
}

export const load = (): Action => ({type: LOAD})

export const remove = (id: number): Action => ({type: REMOVE, payload: id})

export const update = (payload: {}): Action => {
  return {
    type: UPDATE,
    payload
  }
}