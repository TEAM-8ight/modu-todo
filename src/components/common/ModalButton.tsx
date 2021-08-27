import React, { memo } from 'react';
import styled, { css } from 'styled-components';

interface ModalButtonProps {
  type: string;
  icon: string;
  name: string;
  isActive: boolean;
  changeEditState: (type: string, name: string) => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  type,
  icon,
  name,
  isActive,
  changeEditState,
}) => {
  const onClickButton = () => {
    changeEditState(type, name);
  };

  return (
    <Button filter={type} isActive={isActive} onClick={onClickButton}>
      <Icon>{type === 'priority' ? <Circle color={icon} /> : icon}</Icon>
      <Name>{name}</Name>
    </Button>
  );
};

export default ModalButton;

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

const Circle = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.color[color]}; ;
`;