import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';
import { ReactComponent as CirclePlus } from 'assets/svg/circle-plus.svg';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { CreateTodoDto, TCategory, TPriority } from 'types';
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
  { print: '카테고리', data: '', emoji: '' },
  ...Object.entries(TCategory).map(([key, value]) => {
    return { print: value, data: key, emoji: categoryEmoji[value] };
  }),
];

const priorityOptions: any = [
  { print: '중요도', data: '', emoji: '' },
  ...Object.entries(TPriority).map(([key, value]) => {
    return { print: value, data: key, emoji: priorityEmoji[value] };
  }),
];

console.log(categoryOptions);
console.log(priorityOptions);

const TodoCreate: React.FC = () => {
  const today = new Date();
  const [text, setText] = useState<string>('');
  const [due, setDue] = useState<Date>(today);
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const dispatch = useTodosDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const temp: CreateTodoDto = { text, due, category: TCategory.ETC, priority: TPriority.HIGH };
    // dispatch(create(temp));
    console.log({ text, due, category, priority });
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
