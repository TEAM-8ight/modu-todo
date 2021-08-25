import React from 'react';
import styled from 'styled-components';
import TodoHeader from 'components/TodoHeader/TodoHeader';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <TodoHeader />
      <Container>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
        <p>This is the main area.</p>
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

export default App;

const Container = styled.main`
  width: 80vw;
  height: calc(100vh - 60px);
  padding-top: 60px;
  margin: 0 auto;
`;