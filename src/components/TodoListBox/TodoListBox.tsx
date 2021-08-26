import React, { useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const [orderBy, setOrderBy] = useState('default');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleOrderClick = (order: string) => {
    setOrderBy(order);
  };

  // TODO: drag의 box 역할을 도와주는 커스텀훅 만들기
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref || !ref.current) return;
    if (ref.current.isSameNode(e.target as Node)) {
      setIsDragOver(false);
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!ref || !ref.current) return;
    if (ref.current.isSameNode(e.target as Node)) {
      setIsDragOver(true);
      e.preventDefault();
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref || !ref.current) return;
    if (!ref.current.isSameNode(e.target as Node)) return;
    // TODO: update 리듀서가 구현되면 사용하기
    // TODO: 현재 박스의 필터를 알려줘야한다.
    // TODO:
    // TODO: dispatch(update) 상태바꾸기. 아래의 movingTarget이 드래그하는 아이템이다.
    // TODO: const movingTarget = e.dataTransfer.getData('text/plain');
    setIsDragOver(false);
  };

  const ordered = sortingMachine(todos, orderBy);

  return (
    <TodoListBoxWrapper
      ref={ref}
      isLast={isLast}
      draggable
      isDragOver={isDragOver}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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

const TodoListBoxWrapper = styled.div<{ isLast: boolean; isDragOver: boolean }>`
  padding: 25px;
  min-width: 300px;
  border-radius: 10px;
  // background-color: ${({ theme }) => theme.color.lightGray};
  margin-right: ${({ isLast }) => (isLast ? '0' : '25px')};
  background-color: ${({ isDragOver, theme }) => (isDragOver ? 'pink' : theme.color.lightGray)};
`;
