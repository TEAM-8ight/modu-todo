import { TCategory, ITodos, TPriority } from './todo';

export interface CreatedTodo {
  text: string;
  due: Date | null;
  category: string;
  priority: string;
}

export interface NewTodoPayload {
  text: string;
  due: Date;
  category: TCategory;
  priority: TPriority;
}

export interface RemoveTodoType {
  id: number;
}
export interface IFilter {
  category: string[];
  priority: string[];
}
export type FilterType = keyof IFilter;

export interface IModal {
  text: string;
  id?: number;
  message?: string;
}

export interface IState {
  todos: ITodos;
  nextId: number;
  filter: IFilter;
  modal: IModal;
}

export interface IToggle {
  type: string;
  name: string;
}

export interface ISwap {
  first: number;
  second: number;
}

export type Action =
  | { type: 'CREATE'; payload: CreatedTodo }
  | { type: 'REMOVE'; payload: RemoveTodoType }
  | { type: 'UPDATE'; payload: any }
  | { type: 'LOAD'; payload?: {} }
  | { type: 'TOGGLE_FILTER'; payload: IToggle }
  | { type: 'SWAP'; payload: ISwap }
  | { type: 'MODAL'; payload: IModal };
