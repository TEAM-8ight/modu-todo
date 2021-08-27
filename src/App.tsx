import React from 'react';
import styled from 'styled-components';
import { useModalState } from 'context/todoContext/TodoContext';
import useModal from 'utils/hooks/useModal';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoCreate from 'components/TodoCreate/TodoCreate';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import TodoList from 'components/TodoList/TodoList';
import TodoEdit from 'components/TodoEdit/TodoEdit';

const App: React.FC = () => {
  const { Modal } = useModal();
  const modalState = useModalState();

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
      {modalState && (
        <Modal>{modalState.text === 'edit' && <TodoEdit id={modalState.id || 0} />}</Modal>
      )}
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
