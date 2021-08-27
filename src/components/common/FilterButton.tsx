import React, { Dispatch, memo } from 'react';
import styled, { css } from 'styled-components';
import { FilterType, TCategory, TPriority, Action, IFilter } from 'types';
import { useTodosDispatch, useFilterState } from 'context/todoContext/TodoContext';
import { toggleFilter } from 'context/todoContext/actionCreators';

interface FilterButtonProps {
  type: FilterType;
  icon: string;
  name: TCategory | TPriority;
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, icon, name }) => {
  const dispatch: Dispatch<Action> = useTodosDispatch();
  const filter: IFilter = useFilterState();
  const isActive: boolean = filter[type].includes(name);

  const onClickFilter = () => {
    dispatch(toggleFilter(type, name));
  };

  return (
    <Button filter={type} isActive={isActive} onClick={onClickFilter}>
      <Icon>{type === 'priority' ? <Circle color={icon} /> : icon}</Icon>
      <Name>{name}</Name>
    </Button>
  );
};

export default FilterButton;

const Button = styled.button<{ filter: string; isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ filter }) => (filter === 'category' ? '80px' : '60px')};
  height: 35px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  color: ${({ theme }) => theme.color.black};
  outline: none;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.black};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.color.black};
      border: 1px solid ${({ theme }) => theme.color.white};
      color: ${({ theme }) => theme.color.white};
    `}
`;

const Icon = memo(styled.span`
  margin-right: 8px;
`);

const Name = memo(styled.span`
  font-weight: 600;
`);

const Circle = memo(styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.color[color]}; ;
`);
