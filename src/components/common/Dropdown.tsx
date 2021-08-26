import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useDetectOutsideClick } from 'utils/hooks';
import { ReactComponent as DownArrow } from 'assets/svg/down-arrow.svg';
import { ReactComponent as UpArrow } from 'assets/svg/up-arrow.svg';

interface DropdownProps {
  selectedItem: string;
  onItemClick: (selectedOption: string) => void;
  options: Array<{ print: string; data: string }>;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedItem, onItemClick, options }) => {
  const ref = useRef(null);
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

const DropdownContainer = styled.div<{ theme: {} }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 72px;
  height: 35px;
  padding: 8px 15px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.color.alabaster};
  border-radius: 5px;
  font-size: 16px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  svg {
    margin-left: 8px;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 100%;
  border-radius: 5px;
  z-index: 99;
  background-color: white;
  border: 0.5px solid #edf1f9;
  position: absolute;
  top: 40px;
`;

const DropdownItem = styled.li`
  padding: 4px;
  width: 100%;
  text-align: center;
  :hover {
    cursor: pointer;
    background-color: #dce35b33;
  }
`;
