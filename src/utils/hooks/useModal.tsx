import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useModalState, useTodosDispatch } from 'context/todoContext/TodoContext';
import { modal } from 'context/todoContext/actionCreators';

const useModal = () => {
  const dispatch = useTodosDispatch();

  const openModal = (data: { text: string; id: number }) => {
    dispatch(modal(data));
  };

  const closeModal = () => {
    dispatch(modal({ text: '' }));
  };

  interface ModalProps {
    children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ children }) => {
    const modalState = useModalState();

    const ref = useRef<HTMLDivElement | null>(null);
    const elemRef = document.getElementById('modalDom') as HTMLElement;

    useEffect(() => {
      if (modalState?.text) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }, [modalState]);

    if (!modalState?.text) return null;

    return createPortal(
      <Container ref={ref}>
        <Background onClick={closeModal} />
        {children}
      </Container>,
      elemRef,
    );
  };

  return {
    Modal,
    openModal,
    closeModal,
  };
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

export default useModal;
