import React from 'react';
import styled from 'styled-components/macro';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { remove } from 'context/todoContext/actionCreators';
import { ITodo, TPriority, TStatus } from 'types';
import { ReactComponent as Edit } from 'assets/svg/edit.svg';
import { ReactComponent as Delete } from 'assets/svg/delete.svg';
import { ReactComponent as High } from 'assets/svg/high.svg';
import { ReactComponent as Middle } from 'assets/svg/middle.svg';
import { ReactComponent as Low } from 'assets/svg/low.svg';
import { ReactComponent as Check } from 'assets/svg/check.svg';
import { ReactComponent as Checked } from 'assets/svg/checked.svg';

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }: TodoItemProps) => {
  const dispatch = useTodosDispatch();

  const handleRemove = () => {
    dispatch(remove(todo));
  };

  const getCategory = (category: string) => {
    if (category === '업무') return '👩‍💻';
    if (category === '공부') return '📚';
    if (category === '생활') return '🌱';
    if (category === '운동') return '🏃‍♂️';
    else return '💬';
  };

  type POptions = {
    [key in TPriority]: JSX.Element;
  };

  const getPriority = (priority: TPriority) => {
    const options: POptions = {
      [TPriority.HIGH]: <High />,
      [TPriority.MIDDLE]: <Middle />,
      [TPriority.LOW]: <Low />,
    };
    return options[priority] || options[TPriority.MIDDLE];
  };

  type SOptions = {
    [key in TStatus]: JSX.Element;
  };

  const getStatus = (status: TStatus) => {
    const options: SOptions = {
      [TStatus.NOT_STARTED]: <StartButton>시작</StartButton>,
      [TStatus.ONGOING]: <Check />,
      [TStatus.FINISHED]: <Checked />,
    };
    return options[status] || options[TStatus.NOT_STARTED];
  };

  return (
    <ItemContainer>
      <Top>
        <Text>{todo.text}</Text>
        <div>
          <EditBtn>
            <Edit />
          </EditBtn>
          <DeleteBtn onClick={handleRemove}>
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
