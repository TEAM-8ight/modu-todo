import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { getDate } from 'utils/date';
import { DATE_OPTION, DATE_LABEL } from 'utils/constants';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';

interface Props {
  label: string;
  date: Date | null;
  selectDateHandler: (selectedDate: Date) => void;
}

const DateFormat: React.FC<Props> = ({ label, date, selectDateHandler }) => {
  const today = new Date();

  const customDateInput = (
    <CustomDateInput>
      <Calender width="18" height="18" />
      {date && getDate(date, DATE_OPTION)}
    </CustomDateInput>
  );

  return (
    <Item>
      <Text>{label}:</Text>
      {label === DATE_LABEL.due ? (
        <DatePickerStyle
          selected={date}
          onChange={selectDateHandler}
          minDate={today}
          closeOnScroll={true}
          customInput={customDateInput}
        />
      ) : (
        date && getDate(date, DATE_OPTION)
      )}
    </Item>
  );
};

export default DateFormat;

const CustomDateInput = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin: 2px 4px 0 0;
  }
`;

const DatePickerStyle = styled(DatePicker)`
  width: fit-content;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.blue};
    svg {
      stroke: ${({ theme }) => theme.color.blue};
    }
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.borderGray};
  }
`;

const Text = styled.span`
  padding-right: 8px;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.darkGray};
  white-space: nowrap;
`;
