import React, { useReducer, useEffect, useContext, createContext, Dispatch } from 'react';
import { LSHelper } from 'utils';
import { TODOS } from 'utils/constants';
import { IState, Action } from 'types/context';
import reducer from 'context/todoContext/reducer';
import { load } from 'context/todoContext/actionCreators';

const initialState: IState = {
  todos: [],
  nextId: 0,
  filter: { category: [], priority: [] },
  modal: { text: '' },
};

type TodosDispatch = Dispatch<Action>;
const TodosContext = createContext<IState | null>(null);
const TodosDispatchContext = createContext<TodosDispatch | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(load());
  }, []);

  useEffect(() => {
    LSHelper.setItem(TODOS, state.todos);
  }, [state]);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodosState() {
  const state = useContext(TodosContext);
  if (!state) return [];

  let showTodo = state.todos;
  const categoryFilter = state.filter.category;
  const priorityFilter = state.filter.priority;

  if (categoryFilter.length) {
    showTodo = showTodo.filter((todo) => categoryFilter.includes(todo.category));
  }
  if (priorityFilter.length) {
    showTodo = showTodo.filter((todo) => priorityFilter.includes(todo.priority));
  }
  return showTodo;
}

export function useFilterState() {
  const state = useContext(TodosContext);
  if (!state) return { category: [], priority: [] };
  return state.filter;
}

export function useModalState() {
  const state = useContext(TodosContext);
  if (!state) return null;
  return state.modal;
}

export function useTodosStateById(id: number) {
  const state = useContext(TodosContext);
  if (!state) return [];
  return state.todos.filter((todo) => todo.id === id);
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider');
  return dispatch;
}
