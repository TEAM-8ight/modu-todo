import { CREATE, REMOVE, LOAD, UPDATE, TOGGLE_FILTER, SWAP, MODAL } from './actionTypes';
import { ITodo, TStatus, IState, Action, NewTodoPayload, FilterType, ISwap, ITodos } from 'types';
import { LSHelper } from 'utils';
import { TODOS } from 'utils/constants';
import { mockData } from './mockData';

export default function reducer(state: IState, action: Action): IState {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return loadTodos();
    case CREATE:
      const newTodo = createNewTodo(state.nextId, payload);
      return {
        ...state,
        todos: state.todos.concat(newTodo),
        nextId: newTodo.id + 1,
      };
    case UPDATE:
      return { ...state, todos: updateTodos(payload, state.todos) };
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
    case SWAP:
      return { ...state, todos: swapTodos(state.todos, payload) };

    case MODAL:
      return { ...state, modal: payload };
    default:
      return state;
  }
}

const updateTodos = (payload: { id: number }, prevTodos: ITodos) => {
  const { id, ...rest } = payload;
  return prevTodos.map((todo) => {
    if (todo.id !== id) return todo;
    return {
      ...todo,
      ...rest,
      updatedAt: new Date(),
    };
  });
};

const swapTodos = (prevTodos: ITodos, payload: ISwap): ITodos => {
  const { first: firstId, second: secondId } = payload;
  if (firstId === secondId) return prevTodos;
  const firstTodo = prevTodos.find((todo) => todo.id === firstId);
  const secondTodo = prevTodos.find((todo) => todo.id === secondId);
  if (!firstTodo || !secondTodo) return prevTodos;
  if (firstTodo.status === secondTodo.status) {
    const firstIndex = prevTodos.findIndex((todo) => todo.id === firstId);
    const secondIndex = prevTodos.findIndex((todo) => todo.id === secondId);
    if (firstIndex === -1 || secondIndex === -1) return prevTodos;
    const newTodos = [...prevTodos];
    [newTodos[firstIndex], newTodos[secondIndex]] = [newTodos[secondIndex], newTodos[firstIndex]];
    return newTodos;
  } else {
    const newTodos = [...prevTodos];
    const firstIndex = prevTodos.findIndex((todo) => todo.id === firstId);
    const firstTodo = newTodos.splice(firstIndex, 1)[0];
    const secondIndex = newTodos.findIndex((todo) => todo.id === secondId);
    firstTodo.status = newTodos[secondIndex].status;
    newTodos.splice(secondIndex, 0, firstTodo);
    return newTodos;
  }
};

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
  return { todos, nextId: nextId, filter, modal: { text: '' } };
};

const createNewTodo = (id: number, payload: NewTodoPayload) => {
  const { text, due, category, priority } = payload;
  const now = new Date();
  const newTodo: ITodo = {
    id,
    status: TStatus.NOT_STARTED,
    createdAt: now,
    updatedAt: now,
    text,
    due,
    category,
    priority,
  };
  return newTodo;
};
