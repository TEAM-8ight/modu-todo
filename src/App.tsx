import React from 'react';
import styled from 'styled-components';
import TodoList from 'components/TodoList/TodoList';
import TodoCreate from 'components/TodoCreate/TodoCreate';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import TodoHeader from 'components/TodoHeader/TodoHeader';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoHeader />
      <Container>
        <TodoCreate />
        <Filter>
          <TodoFilter type="category" />
          <TodoFilter type="priority" />
        </Filter>
        <TodoList />
      </Container>
    </div>
  );
};

export default App;

const Container = styled.main`
  width: 80vw;
  height: calc(100vh - 60px);
  padding-top: 60px;
  margin: 0 auto;
`;

const Filter = styled.div`
  display: flex;
  padding: 20px;
`;
