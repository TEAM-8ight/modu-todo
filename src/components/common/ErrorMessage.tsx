import React from 'react';
import styled from 'styled-components/macro';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <Wrapper> {message}</Wrapper>;
};

export default ErrorMessage;

const Wrapper = styled.div`
  position: fixed;
  top: 130px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 16px;
  color: ${({ theme }) => theme.color.black};
  text-align: center;
`;
