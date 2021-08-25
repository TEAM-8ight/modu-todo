import React, { Dispatch, memo } from 'react';
import styled, { css } from 'styled-components';
import { useTodosDispatch, useFilterState } from 'context/todoContext/TodoContext';
import { toggleFilter } from 'context/todoContext/actionCreators';
import { FilterType, TCategory, TPriority, Action, IFilter } from 'types';

interface FilterButtonProps {
  type: FilterType;
  icon: string | JSX.Element;
  name: TCategory | TPriority;
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, icon, name }) => {
  const dispatch: Dispatch<Action> = useTodosDispatch();
  const filter: IFilter = useFilterState();
  const isActive: boolean = filter[type].find((f) => f === name) ? true : false;

  const onClickFilter = () => {
    dispatch(toggleFilter(type, name));
  };

  return (
    <Button filter={type} isActive={isActive} onClick={onClickFilter}>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
    </Button>
  );
};

const Button = styled.button<{ filter: string; isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ filter }) => (filter === 'category' ? '80px' : '60px')};
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

export default FilterButton;
