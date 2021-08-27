import React from 'react';
import styled from 'styled-components';
import { getDate } from 'utils';
import { DATE_OPTION } from 'utils/constants';
import { ReactComponent as ModuTodo } from 'assets/svg/modu-todo.svg';

const message = [
  ['😎', '즐거운 일요일!', '일주일을 마무리해보세요.'],
  ['🙋‍♂️', '오늘은 월요일!', '새롭게 한 주를 시작하세요.'],
  ['🎧', '오늘은 화요일!', '좋아하는 음악을 들어보세요.'],
  ['👀', '오늘은 수요일!', '한 주의 정점입니다.'],
  ['🙆‍♂️', '오늘은 목요일!', '이틀만 버티면 주말입니다.'],
  ['💪', '오늘은 금요일!', '하루만 버티면 주말입니다.'],
  ['🎈', '즐거운 토요일!', '신나는 주말입니다.'],
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
