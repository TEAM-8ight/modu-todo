import React from 'react';
import styled from 'styled-components';
import { CATEGORY_EMOJI, PRIORITY_CIRCLE } from 'utils/constants';
import { TCategory, TPriority, FilterType } from 'types';
import FilterButton from 'components/common/FilterButton';

interface TodoFilterProps {
  type: FilterType;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ type }) => {
  const renderCategory = () =>
    Object.entries(TCategory).map(([key, name]) => {
      return <FilterButton key={key} type={type} icon={CATEGORY_EMOJI[name]} name={name} />;
    });

  const renderPriority = () =>
    Object.entries(TPriority).map(([key, name]) => {
      return <FilterButton key={key} type={type} icon={PRIORITY_CIRCLE[name]} name={name} />;
    });

  const text = type === 'category' ? '카테고리' : '중요도';
  const renderFilter = type === 'category' ? renderCategory() : renderPriority();

  return (
    <Wrapper>
      <Text>{text}</Text>
      {renderFilter}
    </Wrapper>
  );
};

export default TodoFilter;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 50px;
  }
`;

const Text = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.color.textGray};
  font-weight: 700;
  white-space: nowrap;
`;
