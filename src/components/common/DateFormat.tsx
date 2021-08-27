import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { getDate } from 'utils';
import { DATE_OPTION, DATE_LABEL } from 'utils/constants';

interface DateFormatProps {
  label?: string;
  date: Date | null;
  selectDateHandler: (selectedDate: Date) => void;
  customInput?: JSX.Element;
  isModal: boolean;
}

const DateFormat: React.FC<DateFormatProps> = ({
  label,
  date,
  selectDateHandler,
  customInput,
  isModal,
}) => {
  const today = new Date();

  const renderDate =
    label === DATE_LABEL.due ? (
      <StyledDatePicker
        selected={date}
        onChange={selectDateHandler}
        minDate={today}
        closeOnScroll={true}
        customInput={customInput}
      />
    ) : (
      date && getDate(date, DATE_OPTION)
    );

  return (
    <Item>
      {isModal && <Text>{label}:</Text>}
      {renderDate}
    </Item>
  );
};

export default DateFormat;

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 14px;
  cursor: pointer;

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
