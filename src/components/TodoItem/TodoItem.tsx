import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Edit } from 'assets/svg/edit.svg';
import { ReactComponent as Delete } from 'assets/svg/delete.svg';
import { ReactComponent as Exercise } from 'assets/svg/exercise.svg';
import { ReactComponent as High } from 'assets/svg/high.svg';

interface Props {}

const TodoItem: React.FC<Props> = (props: Props) => {
  console.log(props);
  return (
    <ItemContainer>
      <Top>
        <Text>런데이 뛰기</Text>
        <div>
          <button>
            <Edit />
          </button>
          <button>
            <Delete />
          </button>
        </div>
      </Top>
      <DueDate>~ 2021-12-31</DueDate>
      <Down>
        <div>
          <Exercise />
          <High />
        </div>
        <Button>시작</Button>
      </Down>
    </ItemContainer>
  );
};

export default TodoItem;

const ItemContainer = styled.div`
  padding: 20px 25px;
  width: 300px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  div {
    display: flex;
    align-items: center;
  }

  button {
    border: none;
    background-color: white;
    padding: 0px;
    margin-left: 8px;
  }
`;

const Text = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
`;

const DueDate = styled.p`
  color: #8f8c8c;
  font-size: 16px;
`;

const Down = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  width: 51px;
  height: 29px;
  border: none;
  border-radius: 5px;
  background-color: #3b3b3b;
  color: white;
  font-size: 15px;
`;
