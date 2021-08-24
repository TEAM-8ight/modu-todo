import React, { useState } from 'react';
import styled from 'styled-components';
import { ITodo, TCategory, TPriority } from 'types';

interface TodoEditProps {
  todo: ITodo;
  closeModal: () => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, closeModal }: TodoEditProps) => {
  const [todoTask, setTodoTask] = useState<ITodo>(todo);

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoTask((prev) => ({ ...prev, [name]: value }));
  };

  const changeFormatDate = (date: Date | null): string => {
    return date?.toISOString().split('T')[0] || '';
  };

  const renderItem = (name: string, enumType: any): JSX.Element => {
    const taskProperty: { [index: string]: any } = todoTask;
    const enumProperty: { [index: string]: any } = enumType;
    return (
      <div>
        {Object.keys(enumType)
          .filter((item) => item !== 'DEFAULT')
          .map((item, index) => (
            <label key={index}>
              <input
                type="radio"
                name={name}
                value={enumProperty[item]}
                checked={enumProperty[item] === taskProperty[name]}
                onChange={changeTask}
              />
              {enumProperty[item]}
            </label>
          ))}
      </div>
    );
  };

  const updateTask = () => {};

  if (!todoTask) return null;

  return (
    <Wrapper>
      <div>
        <div>{todo.status}</div>
        <input name="taskName" value={todoTask.text} onChange={changeTask} />
        <div>{changeFormatDate(todoTask.createdAt)}</div>
        <div>{changeFormatDate(todoTask.updatedAt)}</div>
        <div>{changeFormatDate(todoTask.due)}</div>
        {renderItem('category', TCategory)}
        {renderItem('priority', TPriority)}
      </div>

      <button onClick={updateTask}>task edit</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 500px;
  padding: 32px;

  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 10px;
`;

export default TodoEdit;
