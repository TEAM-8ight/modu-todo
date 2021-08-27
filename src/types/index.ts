import type {
  IState,
  Action,
  CreatedTodo,
  NewTodoPayload,
  IFilter,
  ISwap,
  FilterType,
  IRemove,
  IUpdate,
  IModal,
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
  IUpdate,
  FilterType,
  IRemove,
  IModal,
};

export { TStatus, TCategory, TPriority };
