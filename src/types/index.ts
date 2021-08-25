import type {
  IState,
  Action,
  CreatedTodo,
  NewTodoPayload,
  IFilter,
  FilterType,
} from 'types/context';
import type { ITodo, ITodos } from 'types/todo';
import { TStatus, TCategory, TPriority } from 'types/todo';
import { emojiType, colorType } from 'types/filter';

export type {
  IState,
  Action,
  CreatedTodo,
  NewTodoPayload,
  ITodo,
  ITodos,
  IFilter,
  FilterType,
  emojiType,
  colorType,
};

export { TStatus, TCategory, TPriority };
