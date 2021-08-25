import { LSHelper } from 'utils';
import { CREATE, REMOVE, LOAD, TOGGLE_FILTER } from './actionTypes';
import { IState, Action, CreateTodoDto, FilterType, ITodo, TPriority, TStatus } from 'types';
import { TODOS } from 'utils/contants';
import { mockData } from './mockData';

export default function reducer(state: IState, action: Action): IState {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return loadTodos();
    case CREATE:
      const newTodo = createTodo(state.nextId, payload);
      return {
        ...state,
        todos: state.todos.concat(newTodo),
        nextId: newTodo.id + 1,
      };

    case REMOVE:
      return { ...state, todos: state.todos.filter((todo: ITodo) => todo.id !== payload?.id) };
    case TOGGLE_FILTER:
      const type = payload.type as FilterType;
      const index = state.filter[type].findIndex((filter) => filter === payload.name);
      const newFilter =
        index === -1
          ? state.filter[type].concat(payload.name)
          : state.filter[type].filter((_, idx) => idx !== index);

      return { ...state, filter: { ...state.filter, [type]: newFilter } };
    default:
      return { ...state };
  }
}

// TODO: 수정하기
const loadTodos = (): IState => {
  let todos = LSHelper.getItem(TODOS);
  if (!todos) {
    todos = mockData;
  } else {
    todos.forEach((todo: ITodo) => {
      todo.due = new Date(todo.due);
      if (todo.updatedAt) todo.updatedAt = new Date(todo.updatedAt);
      if (todo.createdAt) todo.createdAt = new Date(todo.createdAt);
    });
  }
  const nextId = todos.length ? Math.max(...todos.map((todo: ITodo) => todo.id)) + 1 : 0;
  const filter = { category: [], priority: [] };
  return { todos, nextId: nextId, filter };
};

const createTodo = (nextId: number, createTodoDto: CreateTodoDto): ITodo => {
  const { text, due, category } = createTodoDto;
  const newTodo: ITodo = {
    id: nextId,
    text,
    status: TStatus.NOT_STARTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    due,
    category,
    priority: TPriority.MIDDLE,
  };

  return newTodo;
};
