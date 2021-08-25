import { TCategory, ITodos, TPriority } from './todo';

export interface CreatedTodo {
  text: string;
  due: Date;
  category: string;
  priority: string;
}

export interface IState {
  todos: ITodos;
  nextId: number;
}

export type Action =
  | { type: 'CREATE'; payload: CreatedTodo }
  | { type: 'DELETE'; payload: any }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} };
