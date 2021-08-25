import React from 'react';
import styled from 'styled-components/macro';
import { ITodo } from 'types';
import { ReactComponent as Edit } from 'assets/svg/edit.svg';
import { ReactComponent as Delete } from 'assets/svg/delete.svg';
import { ReactComponent as Work } from 'assets/svg/work.svg';
import { ReactComponent as Study } from 'assets/svg/study.svg';
import { ReactComponent as Life } from 'assets/svg/life.svg';
import { ReactComponent as Exercise } from 'assets/svg/exercise.svg';
import { ReactComponent as Etc } from 'assets/svg/etc.svg';
import { ReactComponent as High } from 'assets/svg/high.svg';
import { ReactComponent as Middle } from 'assets/svg/middle.svg';
import { ReactComponent as Low } from 'assets/svg/low.svg';
import { ReactComponent as Check } from 'assets/svg/check.svg';
import { ReactComponent as Checked } from 'assets/svg/checked.svg';

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }: TodoItemProps) => {
  const getCategory = (category: string) => {
    if (category === '업무') return <Work />;
    if (category === '공부') return <Study />;
    if (category === '생활') return <Life />;
    if (category === '운동') return <Exercise />;
    if (category === '기타') return <Etc />;
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

  return (
    <ItemContainer>
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
      <DueDate>~ {todo.due.toDateString()}</DueDate>
      <Down>
        <div>
          {getCategory(todo.category)}
          {getPriority(todo.priority)}
        </div>
        {getStatus(todo.status)}
      </Down>
    </ItemContainer>
  );
};

export default TodoItem;

const ItemContainer = styled.div`
  padding: 20px 25px;
  margin-bottom: 20px;
  width: 300px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  background-color: white;
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

  div {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 10px;
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
