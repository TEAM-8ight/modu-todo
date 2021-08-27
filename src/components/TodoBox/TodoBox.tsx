import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TodoItem from '../TodoItem/TodoItem';
import { ITodos } from 'types';
import Dropdown from 'components/common/Dropdown';
import { TStatus } from 'types/todo';
import { sortingMachine } from './utils/sort';
import { dropDownOptions } from './data/dropDownOptions';
import { useTodoBoxDnD } from './utils/useTodoBoxDnD';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { update } from 'context/todoContext/actionCreators';

interface TodoListBoxProps {
  title: string;
  todos: ITodos;
  isLast?: boolean;
  status: TStatus;
}

const TodoSection: React.FC<TodoListBoxProps> = ({ title, todos, status, isLast = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [orderBy, setOrderBy] = useState('default');
  const dispatch = useTodosDispatch();

  const handleOrderClick = (order: string) => {
    setOrderBy(order);
  };

  const { isDragOver, setIsDragOver, handleDragStart, handleDragOver, handleDragLeave } =
    useTodoBoxDnD(ref);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref || !ref.current) return;
    if (!ref.current.isSameNode(e.target as Node)) return;
    const id = +e.dataTransfer.getData('text/plain');
    dispatch(update({ id, status }));
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

export default TodoSection;

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
  min-width: 350px;
  border-radius: 10px;
  margin-right: ${({ isLast }) => (isLast ? '0' : '25px')};
  background-color: ${({ isDragOver, theme }) => (isDragOver ? '#eeeeee' : theme.color.lightGray)};
`;
