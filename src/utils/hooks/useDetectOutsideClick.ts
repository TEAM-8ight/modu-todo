import React, { useState, useEffect, RefObject } from 'react';

export const useDetectOutsideClick = (
  targetRef: RefObject<HTMLElement>,
  initialState: any,
): [boolean, (isActive: boolean) => void] => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const { target } = e;
      if (targetRef.current !== null && !targetRef.current.contains(target as Node)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, targetRef]);

  return [isActive, setIsActive];
};
