import { CREATE, LOAD, REMOVE } from "./actionTypes";
import { Action, CreateTodoDto } from "types/context";

export const create = (createTodoDto: CreateTodoDto): Action => {
  const payload = createTodoDto;
  return { type: CREATE, payload }
}
export const load = (): Action => ({type: LOAD})

export const remove = (id: number): Action => ({type: REMOVE, payload: id})