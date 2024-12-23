import { useLayoutEffect, FC } from 'react';
import { createPortal } from 'react-dom';

type PortalTypes = {
  container?: HTMLElement;
};

const Portal: FC<PortalTypes> = ({ container, children }) => {
  useLayoutEffect(() => {
    if (container) {
      renderContainer();
      return () => unrenderContainer();
    }
  });

  let rootElement = document.body;

  const renderContainer = (): void => {
    getContainer(container).appendChild(rootElement);
  };

  const unrenderContainer = (): void => {
    getContainer(container).removeChild(rootElement);
  };

  return createPortal(children, rootElement);
};

const getContainer = (container?: HTMLElement): HTMLElement => {
  return container || document.body;
};

export default Portal;
