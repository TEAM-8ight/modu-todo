import { TCategory, ITodos, TStatus, TPriority } from 'types/todo';

export interface CreatedTodo {
  text: string;
  due: Date;
  category: string;
  priority: string;
}

export interface NewTodoPayload {
  text: string;
  due: Date;
  category: TCategory;
  priority: TPriority;
}

export interface IRemove {
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

export interface IUpdate {
  id: number;
  text?: string;
  status?: TStatus;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  due?: Date;
  category?: TCategory;
  priority?: TPriority;
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
  | { type: 'REMOVE'; payload: IRemove }
  | { type: 'UPDATE'; payload: IUpdate }
  | { type: 'LOAD'; payload?: any }
  | { type: 'TOGGLE_FILTER'; payload: IToggle }
  | { type: 'SWAP'; payload: ISwap }
  | { type: 'MODAL'; payload: IModal };
