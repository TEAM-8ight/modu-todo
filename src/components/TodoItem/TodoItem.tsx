import React from 'react';
import styled from 'styled-components/macro';
import { getDate } from 'utils';
import { DATE_OPTION, CATEGORY_EMOJI } from 'utils/constants';
import useModal from 'utils/hooks/useModal';
import { useTodoItemDnD } from 'utils/hooks';
import { ITodo, TPriority, TStatus } from 'types';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { remove, update, swap } from 'context/todoContext/actionCreators';
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
  const { openModal } = useModal();

  const showEditModal = () => {
    openModal({ text: 'edit', id: todo.id });
  };

  const {
    isDragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    setIsDragOver,
  } = useTodoItemDnD(todo.id);

  const handleRemove = () => {
    dispatch(remove(todo));
  };

  type StatusOptions = {
    [key in TStatus]: () => void;
  };

  const handleClick = (id: number, status: TStatus) => {
    const options: StatusOptions = {
      [TStatus.NOT_STARTED]: () => dispatch(update({ id, status: TStatus.ONGOING })),
      [TStatus.ONGOING]: () => dispatch(update({ id, status: TStatus.FINISHED })),
      [TStatus.FINISHED]: () => dispatch(update({ id, status: TStatus.ONGOING })),
    };
    options[status]();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
    const movingTarget = e.dataTransfer.getData('text/plain');
    dispatch(swap({first: +movingTarget, second: todo.id}));
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

  const gap = new Date().getTime() - todo.due.getTime();
  const result = Math.floor(gap / (1000 * 60 * 60 * 24));
  const DDay = result > 0 ? `D+${result}` : `D-${Math.abs(result)}`;

  return (
    <>
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
            <ButtonWrapper onClick={showEditModal}>
              <Edit fill="black" className="edit" />
            </ButtonWrapper>
            <ButtonWrapper onClick={handleRemove}>
              <Delete fill="black" className="delete" />
            </ButtonWrapper>
          </div>
        </Top>
        <DueDate>~ {getDate(todo.due, DATE_OPTION)} </DueDate>
        <Down>
          <LeftIcon>
            <Category>{CATEGORY_EMOJI[todo.category]}</Category>
            {getPriority(todo.priority)}
            <DDayDiv passed={result > 0}> {DDay}</DDayDiv>
          </LeftIcon>
          <RightIcon onClick={() => handleClick(todo.id, todo.status)}>
            {getStatus(todo.status)}
          </RightIcon>
        </Down>
      </ItemContainer>
    </>
  );
};

export default TodoItem;

const ItemContainer = styled.div<{ isDragOver: boolean }>`
  padding: 20px 25px;
  margin-bottom: 20px;
  width: 300px;
  background-color: ${({ theme, isDragOver }) =>
    isDragOver ? theme.color.dragGray : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 10px;
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
    padding: 0px;
    border: none;
  }
`;

const Text = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DueDate = styled.p`
  color: ${({ theme }) => theme.color.textGray};
  font-size: 16px;
`;

const ButtonWrapper = styled.button`
  width: 23px;
  height: 23px;
  margin-left: 5px;
  background-color: transparent;
  border-radius: 5px;

  &:hover {
    .edit {
      fill: ${({ theme }) => theme.color.green};
    }
    .delete {
      fill: ${({ theme }) => theme.color.red};
    }
  }
`;

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
`;

const Category = styled.h3`
  margin-right: 10px;
  font-size: 20px;
`;

const DDayDiv = styled.div<{ passed: boolean }>`
  margin-left: 10px;
  font-weight: 500;
  padding: 3px 5px;
  background-color: ${({ passed, theme }) =>
    passed ? theme.color.lightRed : theme.color.lightGreen};
  border-radius: 3px;
`;

const RightIcon = styled.div`
  svg {
    cursor: pointer;
  }

  &:active {
    transform: scale(1.1);
  }
`;

const StartButton = styled.button`
  width: 51px;
  height: 29px;
  background-color: ${({ theme }) => theme.color.darkGray};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white};
  font-size: 15px;
`;
