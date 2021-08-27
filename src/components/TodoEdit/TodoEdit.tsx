import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import { getDate } from 'utils/date';
import useModal from 'utils/hooks/useModal';
import { DATE_OPTION, DATE_LABEL } from 'utils/contants';
import { update } from 'context/todoContext/actionCreators';
import { useTodosDispatch, useTodosStateById } from 'context/todoContext/TodoContext';
import { ITodo, TCategory, TPriority, TStatus } from 'types';
import { ReactComponent as Close } from 'assets/svg/close.svg';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';

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

  const renderDate = (label: string, date: Date | null): JSX.Element => {
    const today = new Date();
    const selectDateHandler = (selectedDate: Date) => {
      setEditTodo((prev) => ({ ...prev, due: selectedDate }));
    };
    const customDateInput = (
      <CustomDateInput>
        <Calender width="18" height="18" />
        {date && getDate(date, DATE_OPTION)}
      </CustomDateInput>
    );

    return (
      <Item>
        <Text>{label}:</Text>
        {label === DATE_LABEL.due ? (
          <DatePickerStyle
            selected={due}
            onChange={selectDateHandler}
            minDate={today}
            closeOnScroll={true}
            customInput={customDateInput}
          />
        ) : (
          date && getDate(date, DATE_OPTION)
        )}
      </Item>
    );
  };

  type keyType = 'status' | 'category' | 'priority';
  const renderItem = (key: keyType, data: string): JSX.Element => {
    const enumType = {
      status: TStatus,
      category: TCategory,
      priority: TPriority,
    };

    const onButtonClick = (item: string) => {
      setEditTodo((prev) => ({ ...prev, [key]: item }));
    };

    return (
      <CenterItem>
        {Object.entries(enumType[key]).map((obj, idx) => {
          const item = obj[1] as string;
          return (
            <Button key={idx} active={data === item} onClick={() => onButtonClick(item)}>
              {item}
            </Button>
          );
        })}
      </CenterItem>
    );
  };

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
      {renderDate(DATE_LABEL.createdAt, createdAt)}
      {renderDate(DATE_LABEL.updatedAt, updatedAt)}
      {renderDate(DATE_LABEL.due, due)}
      {renderItem('status', status)}
      {renderItem('category', category)}
      {renderItem('priority', priority)}
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
  font-size: 30px;
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
  justify-content: center;
`;

const Text = styled.span`
  padding-right: 8px;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.darkGray};
  white-space: nowrap;
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
  svg {
    margin: 2px 4px 0 0;
  }
`;

const DatePickerStyle = styled(DatePicker)`
  width: fit-content;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.blue};
    svg {
      stroke: ${({ theme }) => theme.color.blue};
    }
  }
`;

const Button = styled.button<{ active: boolean }>`
  width: 100px;
  height: 30px;
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.borderGray};
  color: ${({ theme }) => theme.color.darkGray};

  & + & {
    margin-left: 10px;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.color.blue};
      color: ${({ theme }) => theme.color.white};
    `}
`;

const EditButton = styled.button`
  width: 100%;
  padding: 12px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.darkGray};
  font-size: 16px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
