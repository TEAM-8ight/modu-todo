import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import React from 'react';
import TodoItem from 'components/TodoItem/TodoItem';

import { CreateTodoDto, TCategory } from './types';

const App: React.FC<any> = () => {
  const dispatch = useTodosDispatch();

  const handleClick = () => {
    const temp: CreateTodoDto = { text: 'test입니다.', due: new Date(), category: TCategory.STUDY };
    dispatch(create(temp));
  };
  return (
    <div className="App">
      <button onClick={handleClick}>zz</button>
      <TodoItem></TodoItem>
    </div>
  );
};

export default App;
