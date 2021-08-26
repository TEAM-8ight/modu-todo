import React from 'react';
import styled from 'styled-components/macro';
import { useTodosState } from 'context/todoContext/TodoContext';
import TodoListBox from 'components/TodoListBox/TodoListBox';
import { TStatus } from 'types';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const todos = useTodosState();
  const notStarted = todos.filter((todo) => todo.status === '시작안함');
  const onGoing = todos.filter((todo) => todo.status === '진행중');
  const completed = todos.filter((todo) => todo.status === '완료');
  return (
    <TodoListContainer>
      <TodoListBox title="Not Started" status={TStatus.NOT_STARTED} todos={notStarted} />
      <TodoListBox title="In Progress" status={TStatus.ONGOING} todos={onGoing} />
      <TodoListBox title="Completed" status={TStatus.FINISHED} todos={completed} isLast />
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
