import React from 'react';
import styled from 'styled-components';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import { CreateTodoDto, TCategory } from './types';

const App: React.FC<any> = () => {
  const dispatch = useTodosDispatch();

  const handleClick = () => {
    const temp: CreateTodoDto = { text: 'test입니다.', due: new Date(), category: TCategory.STUDY };
    dispatch(create(temp));
  };
  return (
    <div className="App">
      <Filter>
        <TodoFilter type="category" />
        <TodoFilter type="priority" />
      </Filter>
      <button onClick={handleClick}>zz</button>
    </div>
  );
};

const Filter = styled.div`
  display: flex;
  padding: 20px;
`;

export default App;
