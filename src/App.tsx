import React from 'react';
import styled from 'styled-components';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import DropdownTemp from 'components/temp/DropdownTemp';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <TodoHeader />
      <Container>
        <DropdownTemp />
        <Filter>
          <TodoFilter type="category" />
          <TodoFilter type="priority" />
        </Filter>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <div style={{ height: '200vh' }} />
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
