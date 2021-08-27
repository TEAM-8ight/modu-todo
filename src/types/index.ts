import type {
  IState,
  Action,
  CreatedTodo,
  NewTodoPayload,
  IFilter,
  ISwap,
  FilterType,
  RemoveTodoType,
} from 'types/context';
import type { ITodo, ITodos } from 'types/todo';
import { TStatus, TCategory, TPriority } from 'types/todo';

export type {
  IState,
  Action,
  CreatedTodo,
  NewTodoPayload,
  ITodo,
  ITodos,
  IFilter,
  ISwap,
  FilterType,
  RemoveTodoType,
};

export { TStatus, TCategory, TPriority };
