import React, { useReducer, useEffect, useContext, createContext, Dispatch } from 'react';
import reducer from './reducer';
import { load } from './actionCreators';
import { IState, Action } from 'types/context';
import { LSHelper } from 'utils';
import { TODOS } from 'utils/contants';

const initialState: IState = {
  todos: [],
  nextId: 0,
  filter: { category: [], priority: [] },
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
    // console.log('---------- useEffect ---------------');
    // console.log(state.todos);
    // console.log('-------------------------');
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

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider');
  return dispatch;
}
