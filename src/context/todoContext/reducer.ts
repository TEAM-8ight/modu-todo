import { LSHelper } from 'utils';
import { CREATE, DELETE, LOAD } from './actionTypes';
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
