import React from 'react';
import styled from 'styled-components';
import { getDate } from 'utils';
import { DATE_OPTION } from 'utils/constants';
import { ReactComponent as ModuTodo } from 'assets/svg/modu-todo.svg';

const message = [
  ['π', 'μ¦κ±°μ΄ μΌμμΌ!', 'μΌμ£ΌμΌμ λ§λ¬΄λ¦¬ν΄λ³΄μΈμ.'],
  ['πββοΈ', 'μ€λμ μμμΌ!', 'μλ‘­κ² ν μ£Όλ₯Ό μμνμΈμ.'],
  ['π§', 'μ€λμ νμμΌ!', 'μ’μνλ μμμ λ€μ΄λ³΄μΈμ.'],
  ['π', 'μ€λμ μμμΌ!', 'ν μ£Όμ μ μ μλλ€.'],
  ['πββοΈ', 'μ€λμ λͺ©μμΌ!', 'μ΄νλ§ λ²ν°λ©΄ μ£Όλ§μλλ€.'],
  ['πͺ', 'μ€λμ κΈμμΌ!', 'νλ£¨λ§ λ²ν°λ©΄ μ£Όλ§μλλ€.'],
  ['π', 'μ¦κ±°μ΄ ν μμΌ!', 'μ λλ μ£Όλ§μλλ€.'],
];

const TodoHeader: React.FC = () => {
  const today = new Date();
  const dateString = getDate(today, DATE_OPTION);
  const dayIndex = today.getDay();

  return (
    <HeaderContainer>
      <Div>
        <Wrapper>
          <ModuTodo />
          <DateString>{dateString}</DateString>
        </Wrapper>
        <Message>
          {message[dayIndex][0]}
          &nbsp;&nbsp;
          <b>{message[dayIndex][1]}</b>
          {message[dayIndex][2]}
        </Message>
      </Div>
    </HeaderContainer>
  );
};

export default TodoHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.headerGray};
  z-index: 10;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1100px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateString = styled.span`
  margin: 0 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.textGray};
`;

const Message = styled.span`
  font-size: 14px;

  b {
    margin-right: 5px;
    font-weight: 700;
  }
`;
