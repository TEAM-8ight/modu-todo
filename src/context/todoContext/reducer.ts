import { LSHelper } from 'utils';
import { CREATE, REMOVE, LOAD, UPDATE, SWAP } from './actionTypes';
import { IState, Action } from 'types/context';
import { ITodo, TPriority, TStatus } from 'types/todo';
import { TODOS } from 'utils/contants';
import { ITodos, TCategory } from 'types';

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
    case SWAP:
      return { ...state, todos: swapTodos(payload, state.todos)}
    default:
      return { ...state };
  }
}

const swapTodos = (payload: { first: number, second: number}, prevTodos: ITodos) => {
  const { first, second } = payload;
  if (first === second ) return prevTodos;
  const firstIndex = prevTodos.findIndex((todo) => todo.id === first);
  const secondIndex = prevTodos.findIndex((todo) => todo.id === second);
  if (!firstIndex || !secondIndex) return prevTodos;
  const newTodos = [...prevTodos];
  [newTodos[firstIndex], newTodos[secondIndex]] = [newTodos[secondIndex], newTodos[firstIndex]];
  return newTodos;
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

const createTodo = (
  nextId: number,
  payload: {text: string, due: Date, category: TCategory}
):ITodo => {
  const { text, due, category } = payload;
  const current = new Date();
  const newTodo: ITodo  = {
    id: nextId,
    text,
    status: TStatus.NOT_STARTED,
    createdAt: current,
    updatedAt: current,
    due,
    category,
    priority: TPriority.MIDDLE,
  }

  return newTodo
}