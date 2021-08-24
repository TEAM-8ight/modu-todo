import { TCategory, ITodos } from "./todo";

export interface CreateTodoDto {
  text:string,
  due: Date,
  category: TCategory,
}

export interface IState {
  todos: ITodos;
  nextId: number;
}

export type Action =
  | { type: 'CREATE'; payload: CreateTodoDto }
  | { type: 'DELETE'; payload: any }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} };
