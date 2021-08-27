import React from 'react';
import styled from 'styled-components';
import FilterButton from 'components/common/FilterButton';
import { TCategory, TPriority, FilterType } from 'types';
import { CATEGORY_EMOJI, PRIORITY_CIRCLE } from 'utils/constants';

type CategoryKey = keyof typeof TCategory;
type PriorityKey = keyof typeof TPriority;

interface TodoFilterProps {
  type: FilterType;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ type }) => {
  const renderCategory = () =>
    Object.entries(TCategory).map((item) => {
      const key = item[0] as CategoryKey;
      const name = item[1] as TCategory;
      return <FilterButton key={key} type={type} icon={CATEGORY_EMOJI[name]} name={name} />;
    });

  const renderPriority = () =>
    Object.entries(TPriority).map((item) => {
      const key = item[0] as PriorityKey;
      const name = item[1] as TPriority;
      return <FilterButton key={key} type={type} icon={PRIORITY_CIRCLE[name]} name={name} />;
    });

  return (
    <Wrapper>
      <Text>{type === 'category' ? '카테고리' : '중요도'}</Text>
      {type === 'category' ? renderCategory() : renderPriority()}
    </Wrapper>
  );
};

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

export default TodoFilter;
