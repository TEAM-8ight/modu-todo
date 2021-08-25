import React from 'react';
import styled from 'styled-components';
import TodoFilter from 'components/TodoFilter/TodoFilter';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <Filter>
        <TodoFilter type="category" />
        <TodoFilter type="priority" />
      </Filter>
    </div>
  );
};

const Filter = styled.div`
  display: flex;
  padding: 20px;
`;

export default App;
