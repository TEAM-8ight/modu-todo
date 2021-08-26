import React from 'react';
import styled from 'styled-components/macro';
import TodoItem from 'components/TodoItem/TodoItem';
import { useTodosState } from 'context/todoContext/TodoContext';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const todos = useTodosState();
  return (
    <TodoListContainer>
      <NotStarted>
        <Title>Not Started</Title>
        {todos
          .filter((todo) => todo.status === '시작안함')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </NotStarted>
      <InProgress>
        <Title>In Progress</Title>
        {todos
          .filter((todo) => todo.status === '진행중')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </InProgress>
      <Completed>
        <Title>Completed</Title>
        {todos
          .filter((todo) => todo.status === '완료')
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </Completed>
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

const NotStarted = styled.div`
  margin-right: 25px;
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const InProgress = styled.div`
  margin-right: 25px;
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const Completed = styled.div`
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;
