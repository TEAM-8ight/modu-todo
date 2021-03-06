import React from 'react';
import styled from 'styled-components/macro';
import { TStatus } from 'types';
import { useTodosState } from 'context/todoContext/TodoContext';
import TodoSection from 'components/TodoBox/TodoBox';

const TodoList: React.FC = () => {
  const todos = useTodosState();

  const notStarted = todos.filter((todo) => todo.status === '시작안함');
  const onGoing = todos.filter((todo) => todo.status === '진행중');
  const completed = todos.filter((todo) => todo.status === '완료');

  return (
    <TodoListContainer>
      <TodoSection title="Not Started" status={TStatus.NOT_STARTED} todos={notStarted} />
      <TodoSection title="In Progress" status={TStatus.ONGOING} todos={onGoing} />
      <TodoSection title="Completed" status={TStatus.FINISHED} todos={completed} />
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
