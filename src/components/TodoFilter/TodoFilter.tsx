import React from 'react';
import styled from 'styled-components';
import FilterButton from 'components/common/FilterButton';
import { TCategory, TPriority } from 'types';

interface TodoFilterProps {
  type: string;
}

type CategoryKey = keyof typeof TCategory;
type PriorityKey = keyof typeof TPriority;

type emojiType = {
  WORK: string;
  STUDY: string;
  LIVING: string;
  EXERCISE: string;
  ETC: string;
};

type colorType = {
  HIGH: string;
  MIDDLE: string;
  LOW: string;
};

const TodoFilter: React.FC<TodoFilterProps> = ({ type }) => {
  const emoji: emojiType = {
    WORK: '👩‍💻',
    STUDY: '📚',
    LIVING: '🌱',
    EXERCISE: '🏃‍♀️',
    ETC: '💬',
  };

  const circle: colorType = {
    HIGH: 'red',
    MIDDLE: 'yellow',
    LOW: 'green',
  };

  const renderCategory = () =>
    Object.entries(TCategory).map((item) => {
      const key = item[0] as CategoryKey;
      return <FilterButton key={key} type={type} icon={emoji[key]} item={item} />;
    });

  const renderPriority = () =>
    Object.entries(TPriority).map((item) => {
      const key = item[0] as PriorityKey;
      return (
        <FilterButton key={key} type={type} icon={<Circle color={circle[key]} />} item={item} />
      );
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
  font-weight: 700;
  color: ${({ theme }) => theme.color.textGray};
`;

const Circle = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.color[color]}; ;
`;

export default TodoFilter;
