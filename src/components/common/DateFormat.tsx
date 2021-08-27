import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { getDate } from 'utils/date';
import { DATE_OPTION, DATE_LABEL } from 'utils/constants';

interface Props {
  label?: string;
  date: Date | null;
  selectDateHandler: (selectedDate: Date) => void;
  customInput?: JSX.Element;
  isModal: boolean;
}

const DateFormat: React.FC<Props> = ({ label, date, selectDateHandler, customInput, isModal }) => {
  const today = new Date();

  return (
    <Item>
      {isModal && <Text>{label}:</Text>}
      {label === DATE_LABEL.due ? (
        <DatePickerStyle
          selected={date}
          onChange={selectDateHandler}
          minDate={today}
          closeOnScroll={true}
          customInput={customInput}
        />
      ) : (
        date && getDate(date, DATE_OPTION)
      )}
    </Item>
  );
};

export default DateFormat;

const DatePickerStyle = styled(DatePicker)`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    color: ${({ theme }) => theme.color.green};
    svg {
      fill: ${({ theme }) => theme.color.green};
    }
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0px;
  font-size: 14px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.borderGray};
  }
`;

const Text = styled.span`
  padding: 0px 8px 0px 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.darkGray};
  white-space: nowrap;
`;
