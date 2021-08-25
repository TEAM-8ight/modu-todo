import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';
import { ReactComponent as CirclePlus } from 'assets/svg/circle-plus.svg';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { ReactComponent as DownArraow } from 'assets/svg/down-arrow.svg';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { CreateTodoDto, TCategory } from 'types';

const TodoCreate: React.FC = () => {
  const today = new Date();
  const [text, setText] = useState<string>('');
  const [due, setDue] = useState(today);
  const dispatch = useTodosDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const temp: CreateTodoDto = { text, due, category: TCategory.STUDY };
    dispatch(create(temp));
  };

  const selectDateHandler = (d: Date) => {
    setDue(d);
  };

  return (
    <Form>
      <InputContainer>
        <TodoInput
          type="text"
          placeholder="할 일을 입력해주세요."
          value={text}
          onChange={handleChange}
        />
        <CalendarWrapper>
          <DatePicker
            closeOnScroll={true}
            selected={due}
            minDate={today}
            onChange={selectDateHandler}
            customInput={<Calender width="20" height="20" />}
          />
        </CalendarWrapper>
        <Wrapper>
          <span>카테고리</span>
          <DownArraow />
        </Wrapper>
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
  gap: 7px;
  font-size: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  padding: 7px 10px;
`;

const TodoInput = styled.input`
  width: 300px;
  border: none;
  :focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 5px;
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const CalendarWrapper = styled(Wrapper)`
  width: 30px;
  .react-datepicker-popper {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  width: 110px;
  padding: 7px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  background-color: ${(props) => props.theme.color.darkGray};
  color: white;
  font-size: 12px;
  border-radius: 5px;
`;
