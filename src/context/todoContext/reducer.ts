import { LSHelper } from 'utils';
import { CREATE, REMOVE, LOAD } from './actionTypes';
import { ITodo, TPriority, TStatus, IState, Action, CreateTodoDto } from 'types';
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
        todos: state.todos.concat(newTodo),
        nextId: newTodo.id + 1,
      };
    case REMOVE:
      return { ...state, todos: state.todos.filter((todo: ITodo) => todo.id !== payload?.id) };
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
  return { todos, nextId };
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
