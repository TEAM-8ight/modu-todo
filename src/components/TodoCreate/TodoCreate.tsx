import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';
import { ReactComponent as CirclePlus } from 'assets/svg/circle-plus.svg';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { CreatedTodo, TCategory, TPriority } from 'types';
import Dropdown from '../common/Dropdown';

const categoryEmoji = {
  업무: '👩‍💻',
  공부: '📚',
  생활: '🌱',
  운동: '🏃‍♂️',
  기타: '💬',
};

const priorityEmoji = {
  상: '🔴',
  중: '🟡',
  하: '🟢',
};

const categoryOptions: any = [
  { print: '카테고리', data: '' },
  ...Object.entries(TCategory).map(([key, value]) => {
    return { print: `${categoryEmoji[value]} ${value}`, data: key };
  }),
];

const priorityOptions: any = [
  { print: '중요도', data: '' },
  ...Object.entries(TPriority).map(([key, value]) => {
    return { print: `${priorityEmoji[value]} ${value}`, data: key };
  }),
];

const TodoCreate: React.FC = () => {
  const today = new Date();
  const [text, setText] = useState<string>('');
  const [due, setDue] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const dispatch = useTodosDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const initializeState = () => {
    setText('');
    setDue(null);
    setCategory('');
    setPriority('');
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const createdTodo: CreatedTodo = { text, due, category, priority };
    if (text && due && category && priority) {
      dispatch(create(createdTodo));
      initializeState();
      alert('🎉 할 일이 등록되었습니다!');
    } else {
      const alertElement = {
        '할 일 내용': text,
        마감일자: due,
        카테고리: category,
        중요도: priority,
      };
      const alertMessage: string[] = [];
      Object.entries(alertElement).forEach(([key, value]) => {
        value || alertMessage.push(key);
      });
      alert(`✏ ${alertMessage.join(', ')}를 입력해주세요!`);
    }
  };

  const selectDateHandler = (selectedDate: Date) => {
    setDue(selectedDate);
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
        <Dropdown selectedItem={category} onItemClick={setCategory} options={categoryOptions} />
        <Dropdown selectedItem={priority} onItemClick={setPriority} options={priorityOptions} />
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
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 590px;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  padding: 0px 15px;
`;

const TodoInput = styled.input`
  width: 300px;
  min-height: 45px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 16px;
    color: #b1b1b1;
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 5px;
  background-color: ${(props) => props.theme.color.alabaster};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
  .react-datepicker-popper {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  width: 136px;
  height: 55px;
  padding: 7px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  background-color: ${(props) => props.theme.color.darkGray};
  color: white;
  font-size: 18px;
  border-radius: 5px;
  border: none;
`;