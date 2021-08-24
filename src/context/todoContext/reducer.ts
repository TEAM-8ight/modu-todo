import { LSHelper } from 'utils';
import { CREATE, REMOVE, LOAD, UPDATE } from './actionTypes';
import { IState, Action, CreateTodoDto} from 'types/context';
import { ITodo, TPriority, TStatus } from 'types/todo';
import { TODOS } from 'utils/contants';
import { ITodos } from 'types';

export default function reducer(state: IState, action: Action): IState {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return loadTodos();
    case CREATE:
      const newTodo = createTodo(state.nextId, payload)
      return {
        todos : state.todos.concat(newTodo),
        nextId: newTodo.id + 1,
      }
    case UPDATE:
      return { ...state, todos: updateTodos(payload, state.todos) }
    case REMOVE:
      return { ...state, todos: removeTodo(payload, state.todos)};
    default:
      return { ...state };
  }
}

const loadTodos = (): IState => {
  const todos = LSHelper.getItem(TODOS) || [];
  const nextId = todos.length ? Math.max(...todos.map((todo: ITodo) => todo.id)) + 1 : 0
  return { todos,  nextId: nextId};
}

const updateTodos = (payload: { id: number }, prevTodos: ITodos) => {
  const { id, ...rest } = payload;
  return prevTodos.map((todo) => {
    if (todo.id !== id) return todo;
    return {
      ...todo,
      ...rest,
      updatedAt: new Date(),
    }
  })
}

const removeTodo = (payload: {id: number }, prevTodos: ITodos) => 
  prevTodos.filter((todo: ITodo) => todo.id !== payload.id);

const createTodo = (nextId: number, createTodoDto: CreateTodoDto): ITodo => {
  const { text, due, category } = createTodoDto;
  const newTodo: ITodo  = {
    id: nextId,
    text,
    status: TStatus.NOT_STARTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    due,
    category,
    priority: TPriority.MIDDLE,
  }

  return newTodo
}