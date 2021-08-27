import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { sortingMachine } from 'utils';
import { useTodoBoxDnD } from 'utils/hooks';
import { ITodos, TStatus } from 'types';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { update } from 'context/todoContext/actionCreators';
import Dropdown from 'components/common/Dropdown';
import TodoItem from 'components/TodoItem/TodoItem';
import { dropDownOptions } from './data/dropDownOptions';

interface TodoListBoxProps {
  title: string;
  todos: ITodos;
  status: TStatus;
}

const TodoSection: React.FC<TodoListBoxProps> = ({ title, todos, status }) => {
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
    <TodoSectionWrapper
      ref={ref}
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
    </TodoSectionWrapper>
  );
};

export default TodoSection;

const TodoSectionWrapper = styled.div<{ isDragOver: boolean }>`
  padding: 25px;
  min-width: 350px;
  background-color: ${({ isDragOver, theme }) =>
    isDragOver ? theme.color.dragGray : theme.color.lightGray};
  border-radius: 10px;

  & + & {
    margin-left: 25px;
  }
`;

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
