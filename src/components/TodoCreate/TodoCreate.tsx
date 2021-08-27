import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components/macro';
import { getDate } from 'utils';
import { DATE_LABEL, DATE_OPTION } from 'utils/constants';
import { CreatedTodo } from 'types';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { modal } from 'context/todoContext/actionCreators';
import Dropdown from 'components/common/Dropdown';
import DateFormat from 'components/common/DateFormat';
import { categoryOptions, priorityOptions } from 'components/TodoCreate/data/TodoCreateData';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { ReactComponent as CirclePlus } from 'assets/svg/circle-plus.svg';

const TodoCreate: React.FC = () => {
  const dispatch = useTodosDispatch();

  const [text, setText] = useState<string>('');
  const [due, setDue] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const initializeState = () => {
    setText('');
    setDue(null);
    setCategory('');
    setPriority('');
  };

  const customInput = (
    <CustomDateInput>
      완료일 :
      <Calender width="18" height="18" />
      {due && getDate(due, DATE_OPTION)}
    </CustomDateInput>
  );

  const CreateSuccess = (createdTodo: CreatedTodo) => {
    dispatch(create(createdTodo));
    initializeState();
  };

  const CreateFail = (createdTodo: CreatedTodo) => {
    const alertElement: {
      [key: string]: string;
    } = {
      text: '텍스트',
      due: '완료일자',
      category: '카테고리',
      priority: '중요도',
    };
    const alertMessage: string[] = [];
    Object.entries(createdTodo).forEach(([key, value]) => {
      value || alertMessage.push(alertElement[key]);
    });
    dispatch(modal({ text: 'error', message: `❗  ${alertMessage.join(', ')}를 입력해주세요.` }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const createdTodo: CreatedTodo = { text, due, category, priority };
    if (text && due && category && priority) {
      CreateSuccess(createdTodo);
    } else {
      CreateFail(createdTodo);
    }
  };

  const handleDueChange = (selectedDate: Date) => {
    setDue(selectedDate);
  };

  return (
    <Form>
      <InputContainer>
        <TodoInput
          type="text"
          placeholder="할 일을 입력해주세요."
          value={text}
          onChange={handleTextChange}
        />
        <TodoOptions>
          <DateWrapper>
            <DateFormat
              label={DATE_LABEL.due}
              date={due}
              selectDateHandler={handleDueChange}
              customInput={customInput}
              isModal={false}
            />
          </DateWrapper>
          <Dropdown selectedItem={category} onItemClick={setCategory} options={categoryOptions} />
          <Dropdown selectedItem={priority} onItemClick={setPriority} options={priorityOptions} />
        </TodoOptions>
      </InputContainer>
      <Button onClick={handleSubmit}>
        <CirclePlus width="22" height="22" />
        추가하기
      </Button>
    </Form>
  );
};

export default TodoCreate;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-self: flex-start;
  gap: 7px;
  margin-top: 10px;
  padding-left: 10px;
  font-size: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  width: 900px;
  gap: 5px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 5px;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  min-height: 45px;
  border: none;
  font-size: 18px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.borderGray};
  }
`;

const TodoOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 0 10px;
  gap: 5px;
  background-color: ${({ theme }) => theme.color.alabaster};
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 5px;
  cursor: pointer;
`;

const CustomDateInput = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  svg {
    margin-left: 3px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 136px;
  height: 55px;
  padding: 7px;
  gap: 5px;
  background-color: ${({ theme }) => theme.color.darkGray};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
`;
