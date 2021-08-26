import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from '../TodoItem/TodoItem';
import { ITodos, ITodo } from 'types';
import Dropdown from 'components/common/Dropdown';

interface TodoListBoxProps {
  title: string;
  todos: ITodos;
  isLast?: boolean;
}

const options = [
  {
    print: '사용자지정',
    data: 'default',
  },
  {
    print: '신규순',
    data: 'latest',
  },
  {
    print: '오래된순',
    data: 'oldest',
  },
  {
    print: '중요도',
    data: 'priority',
  },
  {
    print: '마감임박',
    data: 'due',
  },
];

const sortingMachine = (todos: ITodos, key: string) => {
  type Option = {
    [key: string]: ITodos;
  };
  const options: Option = {
    default: [...todos],
    latest: [...todos].sort((a: ITodo, b: ITodo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
      else return 0;
    }),
    oldest: [...todos].sort((a: ITodo, b: ITodo) => {
      if (!a.createdAt || !b.createdAt) return 0;
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      else return 0;
    }),
    due: [...todos].sort((a: ITodo, b: ITodo) => {
      if (a.due > b.due) return 1;
      if (a.due < b.due) return -1;
      else return 0;
    }),
    priority: [...todos].sort((a: ITodo, b: ITodo) => {
      if (a.priority > b.priority) return 1;
      if (a.priority < b.priority) return -1;
      else return 0;
    }),
  };
  return options[key];
};

const TodoListBox: React.FC<TodoListBoxProps> = ({ title, todos, isLast = false }) => {
  // NOTE: 사용자 지정 정렬(기본), 신규순(createdAt), 오래된 순(createdAt), 중요도순(priority), 마감임박순 (due)
  const [orderBy, setOrderBy] = useState('default');
  const handleOrderClick = (order: string) => {
    setOrderBy(order);
  };
  const ordered = sortingMachine(todos, orderBy);
  return (
    <TodoListBoxWrapper isLast={isLast}>
      <TodoListBoxHeader>
        <Title>{title}</Title>
        <Dropdown selectedItem={orderBy} onItemClick={handleOrderClick} options={options} />
      </TodoListBoxHeader>
      {ordered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </TodoListBoxWrapper>
  );
};

export default TodoListBox;

const TodoListBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const TodoListBoxWrapper = styled.div<{ isLast: boolean }>`
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
  margin-right: ${({ isLast }) => (isLast ? '0' : '25px')};
`;
