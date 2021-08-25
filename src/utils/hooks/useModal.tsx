import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  interface ModalProps {
    children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const elemRef = document.getElementById('modalDom') as HTMLElement;

    useEffect(() => {
      if (showModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }, []);

    if (!showModal) return null;

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
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

export default useModal;
