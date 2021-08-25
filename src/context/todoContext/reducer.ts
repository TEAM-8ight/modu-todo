import { LSHelper } from 'utils';
import { CREATE, DELETE, LOAD, TOGGLE_FILTER } from './actionTypes';
import { IState, Action, CreateTodoDto, FilterType, ITodo, TPriority, TStatus } from 'types';
import { TODOS } from 'utils/contants';

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
    case DELETE:
      return { ...state };
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

const loadTodos = (): IState => {
  const todos = LSHelper.getItem(TODOS) || [];
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
