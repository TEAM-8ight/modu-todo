import styled from 'styled-components';
import { create, update } from 'context/todoContext/actionCreators';
import { useTodosDispatch } from 'context/todoContext/TodoContext';
import { remove } from '../../context/todoContext/actionCreators';
import { TCategory } from 'types';

const ReducerTester = () => {
  const temp: { text: string; due: Date; category: TCategory } = {
    text: 'test입니다.',
    due: new Date(),
    category: TCategory.STUDY,
  };
  const dispatch = useTodosDispatch();
  return (
    <StyledContainer>
      <button onClick={() => dispatch(create(temp))}>새로 만들기</button>
      <button onClick={() => dispatch(remove({ id: 10 }))}>삭제</button>
      <button onClick={() => dispatch(update({ id: 3, text: '변경' }))}>텍스트 업데이트</button>
    </StyledContainer>
  );
};

export default ReducerTester;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
