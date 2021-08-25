import React from 'react';
import styled from 'styled-components/macro';
import { mockData } from 'context/todoContext/mockData';
import TodoItem from 'components/TodoItem/TodoItem';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  console.log(props);
  return (
    <TodoListContainer>
      {mockData && mockData.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div``;
