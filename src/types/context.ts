import { TCategory, ITodos } from './todo';

export interface CreateTodoDto {
  text: string;
  due: Date;
  category: TCategory;
}

export interface RemoveTodoType {
  id: number;
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
  | { type: 'CREATE'; payload: CreateTodoDto }
  | { type: 'REMOVE'; payload: RemoveTodoType }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} }
  | { type: 'TOGGLE_FILTER'; payload: IToggle };
