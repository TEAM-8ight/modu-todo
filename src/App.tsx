import React from 'react';
import styled from 'styled-components';
import { useModalState } from 'context/todoContext/TodoContext';
import useModal from 'utils/hooks/useModal';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoCreate from 'components/TodoCreate/TodoCreate';
import TodoFilter from 'components/TodoFilter/TodoFilter';
import TodoList from 'components/TodoList/TodoList';
import TodoEdit from 'components/TodoEdit/TodoEdit';
import ErrorMessage from './components/common/ErrorMessage';

const App: React.FC = () => {
  const { Modal } = useModal();
  const modalState = useModalState();

  return (
    <>
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
        <Modal>
          {modalState.text === 'edit' && modalState.id && <TodoEdit id={modalState.id} />}
          {modalState.text === 'error' && modalState.message && (
            <ErrorMessage message={modalState.message} />
          )}
        </Modal>
      )}
    </>
  );
};

export default App;

const Container = styled.main`
  width: 1100px;
  height: calc(100vh - 60px);
  padding-top: 80px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
`;

const Filter = styled.div`
  display: flex;
  padding: 20px 20px 20px 0;
  align-self: flex-start;
`;
