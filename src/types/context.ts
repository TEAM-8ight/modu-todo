import { TCategory, ITodos } from "./todo";

export interface IState {
  todos: ITodos;
  nextId: number;
}

export type Action =
  | { type: 'CREATE'; payload: { text: string, due: Date, category: TCategory} }
  | { type: 'REMOVE'; payload: any }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} };
