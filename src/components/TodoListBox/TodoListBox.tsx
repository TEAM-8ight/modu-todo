import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TodoItem from '../TodoItem/TodoItem';
import { ITodos } from 'types';
import Dropdown from 'components/common/Dropdown';
import { TStatus } from 'types/todo';
import { sortingMachine } from './utils/sort';
import { dropDownOptions } from './data/dropDownOptions';

interface TodoListBoxProps {
  title: string;
  todos: ITodos;
  isLast?: boolean;
  status: TStatus;
}

const TodoListBox: React.FC<TodoListBoxProps> = ({ title, todos, status, isLast = false }) => {
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
    // TODO: dispatch(update) 상태바꾸기. 아래의 movingTarget이 드래그하는 아이템이다.
    // TODO: 목표 status는 props.status
    // TODO: const id = +e.dataTransfer.getData('text/plain');
    // TODO: dispatch(update({id, status}))
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
        <Dropdown selectedItem={orderBy} onItemClick={handleOrderClick} options={dropDownOptions} />
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
