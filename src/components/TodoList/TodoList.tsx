import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TodoItem from 'components/TodoItem/TodoItem';
import { useTodosState } from 'context/todoContext/TodoContext';

import useModal from 'utils/hooks/useModal';
import TodoEdit from 'components/TodoEdit/TodoEdit';
import { ITodo } from 'types';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const todos = useTodosState();

  const { Modal, openModal, closeModal } = useModal();
  const [selectedTodo, setSelectedTodo] = useState<ITodo>();

  const showEditModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    openModal();
  };

  return (
    <TodoListContainer>
      <NotStarted>
        <Title>Not Started</Title>
        {todos
          .filter((todo) => todo.status === '시작안함')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} showEditModal={() => showEditModal(todo)} />
          ))}
      </NotStarted>
      <InProgress>
        <Title>In Progress</Title>
        {todos
          .filter((todo) => todo.status === '진행중')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} showEditModal={() => showEditModal(todo)} />
          ))}
      </InProgress>
      <Completed>
        <Title>Completed</Title>
        {todos
          .filter((todo) => todo.status === '완료')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} showEditModal={() => showEditModal(todo)} />
          ))}
      </Completed>
      <Modal>{selectedTodo && <TodoEdit todo={selectedTodo} closeModal={closeModal} />}</Modal>
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 600;
`;

const GrayBackground = styled.div`
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const NotStarted = styled(GrayBackground)`
  margin-right: 25px;
`;

const InProgress = styled(GrayBackground)`
  margin-right: 25px;
`;

const Completed = styled(GrayBackground)``;
