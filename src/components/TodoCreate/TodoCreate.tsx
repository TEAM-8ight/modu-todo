import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';
import { ReactComponent as CirclePlus } from 'assets/svg/circle-plus.svg';
import { create } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { CreatedTodo, TCategory, TPriority } from 'types';
import Dropdown from '../common/Dropdown';
import DateFormat from 'components/common/DateFormat';
import { DATE_LABEL } from 'utils/constants';

const categoryEmoji = {
  업무: '👩‍💻',
  공부: '📚',
  생활: '🌱',
  운동: '🏃‍♀️',
  기타: '💬',
};

const priorityEmoji = {
  상: '🔴',
  중: '🟡',
  하: '🟢',
};

const categoryOptions: { print: string; data: string }[] = [
  { print: '카테고리', data: '' },
  ...Object.entries(TCategory).map(([key, value]) => {
    return { print: `${categoryEmoji[value]} ${value}`, data: value };
  }),
];

const priorityOptions: { print: string; data: string }[] = [
  { print: '중요도', data: '' },
  ...Object.entries(TPriority).map(([key, value]) => {
    return { print: `${priorityEmoji[value]} ${value}`, data: value };
  }),
];

const TodoCreate: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [due, setDue] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const dispatch = useTodosDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const initializeState = () => {
    setText('');
    setDue(null);
    setCategory('');
    setPriority('');
  };

  const CreateSuccess = (createdTodo: CreatedTodo) => {
    dispatch(create(createdTodo));
    initializeState();
    alert('🎉 할 일이 등록되었습니다!');
  };

  const CreateFail = (createdTodo: CreatedTodo) => {
    const alertElement: {
      [key: string]: string;
    } = {
      text: '할 일 내용',
      due: '완료일자',
      category: '카테고리',
      priority: '중요도',
    };
    const alertMessage: string[] = [];
    Object.entries(createdTodo).forEach(([key, value]) => {
      value || alertMessage.push(alertElement[key]);
    });
    alert(`✏ ${alertMessage.join(', ')}를 입력해주세요!`);
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
          <Wrapper>
            <DateFormat label={DATE_LABEL.due} date={due} selectDateHandler={handleDueChange} />
          </Wrapper>
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
  gap: 7px;
  font-size: 12px;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  padding: 0px 15px;
`;

const TodoInput = styled.input`
  flex-grow: 1;
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

const TodoOptions = styled.div`
  display: flex; 
  align-items: center;  
  gap: 10px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${(props) => props.theme.color.alabaster};
  border-radius: 5px;
  cursor: pointer;
  height: 35px;
  padding: 0 10px;
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
