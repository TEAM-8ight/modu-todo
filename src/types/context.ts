import { TCategory, ITodos, TPriority, ITodo } from './todo';

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
  | { type: 'REMOVE'; payload: RemoveTodoType }
  | { type: 'UPDATE'; payload: ITodo }
  | { type: 'LOAD'; payload?: {} }
  | { type: 'TOGGLE_FILTER'; payload: IToggle };
