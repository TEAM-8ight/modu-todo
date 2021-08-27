import React, { useState } from 'react';
import styled from 'styled-components';
import useModal from 'utils/hooks/useModal';
import {
  DATE_OPTION,
  DATE_LABEL,
  STATUS_SVG,
  CATEGORY_EMOJI,
  PRIORITY_CIRCLE,
} from 'utils/constants';
import { update } from 'context/todoContext/actionCreators';
import { ITodo, TCategory, TPriority, TStatus } from 'types';
import { useTodosDispatch, useTodosStateById } from 'context/todoContext/TodoContext';
import DateFormat from 'components/common/DateFormat';
import ModalButton from 'components/common/ModalButton';
import { ReactComponent as Close } from 'assets/svg/close.svg';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { getDate } from 'utils/date';
interface TodoEditProps {
  id: number;
}

const TodoEdit: React.FC<TodoEditProps> = ({ id }) => {
  const dispatch = useTodosDispatch();
  const { closeModal } = useModal();

  const todo: ITodo[] = useTodosStateById(id);
  const [editTodo, setEditTodo] = useState<ITodo>(todo[0]);
  const { text, status, createdAt, updatedAt, due, category, priority }: ITodo = editTodo;

  const changeEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTodo((prev) => ({ ...prev, [name]: value }));
  };

  const editButtonClick = () => {
    if (Object.entries(todo).toString() !== Object.entries(editTodo).toString()) {
      dispatch(update(editTodo));
    }
    closeModal();
  };

  const selectDateHandler = (selectedDate: Date) => {
    setEditTodo((prev) => ({ ...prev, due: selectedDate }));
  };

  const changeEditState = (key: string, name: string) => {
    setEditTodo((prev) => ({ ...prev, [key]: name }));
  };

  function renderItem<T>(anEnum: T, type: string, value: string): JSX.Element {
    const enumValues = Object.values(anEnum) as unknown as string[];
    return (
      <CenterItem>
        {enumValues.map((item, idx) => {
          let icon = '';
          if (type === 'status') icon = STATUS_SVG[item];
          if (type === 'category') icon = CATEGORY_EMOJI[item];
          if (type === 'priority') icon = PRIORITY_CIRCLE[item];
          return (
            <ModalButton
              key={idx}
              type={type}
              icon={icon}
              name={item}
              isActive={item === value}
              changeEditState={changeEditState}
            />
          );
        })}
      </CenterItem>
    );
  }

  const customInput = (
    <CustomDateInput>
      <Calender width="18" height="18" />
      {due && getDate(due, DATE_OPTION)}
    </CustomDateInput>
  );

  return (
    <Wrapper>
      <CloseDiv onClick={closeModal}>
        <Close width="36" height="36" />
      </CloseDiv>
      <Title>MODO TODO EDIT</Title>
      <Item>
        <TodoInput
          name="text"
          placeholder="할 일을 입력해주세요"
          value={text}
          onChange={changeEditTodo}
        />
      </Item>
      <DateFormat
        label={DATE_LABEL.createdAt}
        date={createdAt}
        selectDateHandler={selectDateHandler}
        isModal={true}
      />
      <DateFormat
        label={DATE_LABEL.updatedAt}
        date={updatedAt}
        selectDateHandler={selectDateHandler}
        isModal={true}
      />
      <DateFormat
        label={DATE_LABEL.due}
        date={due}
        selectDateHandler={selectDateHandler}
        customInput={customInput}
        isModal={true}
      />
      {renderItem(TStatus, 'status', status)}
      {renderItem(TCategory, 'category', category)}
      {renderItem(TPriority, 'priority', priority)}
      <EditButton onClick={editButtonClick}>수정</EditButton>
    </Wrapper>
  );
};

export default TodoEdit;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 16px;
`;

const CloseDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.color.red};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.borderGray};
  }
`;

const CenterItem = styled(Item)`
  justify-content: left;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 800;
  outline: none;
`;

const CustomDateInput = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  svg {
    margin: 2px 4px 0 0;
  }
`;

const EditButton = styled.button`
  width: 100%;
  padding: 12px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.darkGray};
  font-size: 16px;
  border-radius: 10px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
