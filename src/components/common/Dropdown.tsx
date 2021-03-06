import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useDetectOutsideClick } from 'utils/hooks';
import { ReactComponent as DownArrow } from 'assets/svg/down-arrow.svg';
import { ReactComponent as UpArrow } from 'assets/svg/up-arrow.svg';

interface DropdownProps {
  selectedItem: string;
  onItemClick: (selectedOption: string) => void;
  options: Array<{ print: JSX.Element | string; data: string }>;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedItem, onItemClick, options }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [isOpened, setIsOpened] = useDetectOutsideClick(ref, false);

  const dataToPrint = () => {
    const item = options.find(({ data }) => data === selectedItem);
    if (!item) return '';
    return item.print;
  };

  const handleItemClick = (data: string) => {
    onItemClick(data);
    setIsOpened(!isOpened);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setIsOpened(!isOpened)}>
        {dataToPrint()}
        {isOpened ? <UpArrow /> : <DownArrow />}
      </DropdownHeader>
      <DropdownList ref={ref} isOpen={isOpened}>
        {options
          .filter(({ data }) => data)
          .map(({ print, data }) => (
            <DropdownItem key={data} onClick={() => handleItemClick(data)}>
              {print}
            </DropdownItem>
          ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 94px;
  height: 35px;
  padding: 8px 13px;
  background-color: ${({ theme }) => theme.color.alabaster};
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 5px;
  font-size: 14px;
  user-select: none;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-top: 3px;
    margin-left: 6px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 100%;
  position: absolute;
  top: 35px;
  z-index: 5;
  background-color: white;
  border: 0.5px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 5px;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 4px;
  width: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.lightGreen};
  }
`;
