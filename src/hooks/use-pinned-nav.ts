import { RefObject, useEffect, useState } from 'react';

export const usePinnedNav = (targetRef: RefObject<HTMLElement | null>, offset = 96) => {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return undefined;
    }

    const updatePinnedState = () => {
      const shouldPin = target.getBoundingClientRect().bottom <= offset;
      setIsPinned((currentValue) => (currentValue === shouldPin ? currentValue : shouldPin));
    };

    updatePinnedState();

    window.addEventListener('scroll', updatePinnedState, { passive: true });
    window.addEventListener('resize', updatePinnedState);

    return () => {
      window.removeEventListener('scroll', updatePinnedState);
      window.removeEventListener('resize', updatePinnedState);
    };
  }, [offset, targetRef]);

  return isPinned;
};
