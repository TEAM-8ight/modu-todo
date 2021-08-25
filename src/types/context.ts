import { TCategory, ITodos, TPriority } from './todo';

export interface CreatedTodo {
  text: string;
  due: Date | null;
  category: string;
  priority: string;
}

export interface IFilter {
  category: string[];
  priority: string[];
}
export type FilterType = keyof IFilter;

export interface IState {
  todos: ITodos;
  nextId: number;
  filter: IFilter;
}

export interface IToggle {
  type: string;
  name: string;
}

export type Action =
  | { type: 'CREATE'; payload: CreatedTodo }
  | { type: 'DELETE'; payload: any }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} }
  | { type: 'TOGGLE_FILTER'; payload: IToggle };
