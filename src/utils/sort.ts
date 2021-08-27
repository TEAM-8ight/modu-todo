import { ITodo, ITodos } from 'types';

const sortingMachine = (todos: ITodos, key: string) => {
  type Option = {
    [key: string]: ITodos;
  };
  const options: Option = {
    default: [...todos],
    latest: [...todos].sort((a: ITodo, b: ITodo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
      else return 0;
    }),
    oldest: [...todos].sort((a: ITodo, b: ITodo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      else return 0;
    }),
    due: [...todos].sort((a: ITodo, b: ITodo) => {
      if (a.due > b.due) return 1;
      if (a.due < b.due) return -1;
      else return 0;
    }),
    priority: [...todos].sort((a: ITodo, b: ITodo) => {
      if (a.priority > b.priority) return 1;
      if (a.priority < b.priority) return -1;
      else return 0;
    }),
  };
  return options[key];
};

export default sortingMachine;
