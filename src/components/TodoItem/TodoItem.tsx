import React from 'react';
import styled from 'styled-components/macro';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { ITodo } from 'types';
import { ReactComponent as Edit } from 'assets/svg/edit.svg';
import { ReactComponent as Delete } from 'assets/svg/delete.svg';
import Work from 'assets/svg/work.svg';
import Study from 'assets/svg/study.svg';
import Life from 'assets/svg/life.svg';
import Exercise from 'assets/svg/exercise.svg';
import Etc from 'assets/svg/etc.svg';
import { ReactComponent as High } from 'assets/svg/high.svg';
import { ReactComponent as Middle } from 'assets/svg/middle.svg';
import { ReactComponent as Low } from 'assets/svg/low.svg';
import { ReactComponent as Check } from 'assets/svg/check.svg';
import { ReactComponent as Checked } from 'assets/svg/checked.svg';
import { useTodoItemDnD } from './utils/useTodoItemDnD';
import { swap } from 'context/todoContext/actionCreators';

interface TodoItemProps {
  todo: ITodo;
}

const getCategory = (category: string) => {
  if (category === '업무') return <img src={Work} alt="업무" />;
  if (category === '공부') return <img src={Study} alt="공부" />;
  if (category === '생활') return <img src={Life} alt="생활" />;
  if (category === '운동') return <img src={Exercise} alt="운동" />;
  if (category === '기타') return <img src={Etc} alt="기타" />;
};

const getPriority = (priority: string) => {
  if (priority === '상') return <High />;
  if (priority === '중') return <Middle />;
  if (priority === '하') return <Low />;
};

const getStatus = (status: string) => {
  if (status === '시작안함') return <StartButton>시작</StartButton>;
  if (status === '진행중') return <Check />;
  if (status === '완료') return <Checked />;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }: TodoItemProps) => {
  const dispatch = useTodosDispatch();
  const {
    isDragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    setIsDragOver,
  } = useTodoItemDnD(todo.id);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
    const movingTarget = e.dataTransfer.getData('text/plain');
    dispatch(swap(+movingTarget, todo.id));
  };

  return (
    <ItemContainer
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      isDragOver={isDragOver}
    >
      <Top>
        <Text>{todo.text}</Text>
        <div>
          <EditBtn>
            <Edit />
          </EditBtn>
          <DeleteBtn>
            <Delete />
          </DeleteBtn>
        </div>
      </Top>
      <DueDate>~ {todo.due.toISOString().split('T')[0]} </DueDate>
      <Down>
        <LeftIcon>
          {getCategory(todo.category)}
          {getPriority(todo.priority)}
        </LeftIcon>
        <RightIcon>{getStatus(todo.status)}</RightIcon>
      </Down>
    </ItemContainer>
  );
};

export default TodoItem;

const ItemContainer = styled.div<{ isDragOver: boolean }>`
  padding: 20px 25px;
  margin-bottom: 20px;
  width: 300px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  // background-color: white;
  background-color: ${({ isDragOver }) => (isDragOver ? 'red' : 'white')};
  cursor: grab;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  div {
    display: flex;
    align-items: center;
  }

  button {
    border: none;
    background-color: white;
    padding: 0px;
    margin-left: 8px;
  }
`;

const Text = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
`;

const DueDate = styled.p`
  color: #8f8c8c;
  font-size: 16px;
`;

const EditBtn = styled.button``;
const DeleteBtn = styled.button``;

const Down = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;

const RightIcon = styled.div`
  svg {
    cursor: pointer;
  }
`;

const StartButton = styled.button`
  width: 51px;
  height: 29px;
  border: none;
  border-radius: 5px;
  background-color: #3b3b3b;
  color: white;
  font-size: 15px;
`;
