import { LSHelper } from 'utils';
import { CREATE, DELETE, LOAD } from './actionTypes';
import { ITodo, TStatus, IState, Action, CreatedTodo, TCategory, TPriority } from 'types';
import { TODOS } from 'utils/contants';
import { mockData } from './mockData';

export default function reducer(state: IState, action: Action): IState {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return loadTodos();
    case CREATE:
      const { text, due, category, priority } = payload;
      const now = new Date();
      const newTodo: ITodo = {
        id: state.nextId,
        status: TStatus.NOT_STARTED,
        createdAt: now,
        updatedAt: now,
        text,
        due,
        category,
        priority,
      };
      return {
        todos: [...state.todos, newTodo],
        nextId: newTodo.id + 1,
      };
    case DELETE:
      return { ...state };
    default:
      return { ...state };
  }
}

const loadTodos = (): IState => {
  const todos = LSHelper.getItem(TODOS) || mockData;
  const nextId = todos.length ? Math.max(...todos.map((todo: ITodo) => todo.id)) + 1 : 0;
  return { todos, nextId: nextId };
};

