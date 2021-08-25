import React from 'react';
import styled from 'styled-components';
import { TCategory, TPriority } from 'types';

interface FilterButtonProps {
  type: string;
  icon: string | JSX.Element;
  item: [string, TCategory | TPriority];
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, icon, item }) => {
  const [key, name] = item;

  const onClickFilter = () => {};

  return (
    <Button filter={type} onClick={onClickFilter}>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
    </Button>
  );
};

const Button = styled.button<{ filter: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ filter }) => (filter === 'category' ? '80px' : '60px')};
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  outline: none;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.blue};
  }
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.color.black};
`;

export default FilterButton;
