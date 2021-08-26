import React from 'react';
import styled from 'styled-components/macro';
import { useTodosState } from 'context/todoContext/TodoContext';
import TodoBox from 'components/TodoBox/TodoBox';
import { TStatus } from 'types';

const TodoList: React.FC = () => {
  const todos = useTodosState();
  const notStarted = todos.filter((todo) => todo.status === '시작안함');
  const onGoing = todos.filter((todo) => todo.status === '진행중');
  const completed = todos.filter((todo) => todo.status === '완료');
  return (
    <TodoListContainer>
      <TodoBox title="Not Started" status={TStatus.NOT_STARTED} todos={notStarted} />
      <TodoBox title="In Progress" status={TStatus.ONGOING} todos={onGoing} />
      <TodoBox title="Completed" status={TStatus.FINISHED} todos={completed} isLast />
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
