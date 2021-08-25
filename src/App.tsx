import React from 'react';
import styled from 'styled-components';
import TodoList from 'components/TodoList/TodoList';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import TodoHeader from 'components/TodoHeader/TodoHeader';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <TodoHeader />
      <Container>
        <Filter>
          <TodoFilter type="category" />
          <TodoFilter type="priority" />
        </Filter>
        <TodoList />
      </Container>
    </div>
  );
};

const Filter = styled.div`
  display: flex;
  padding: 20px;
`;

export default App;

const Container = styled.main`
  width: 80vw;
  height: calc(100vh - 60px);
  padding-top: 60px;
  margin: 0 auto;
`;
