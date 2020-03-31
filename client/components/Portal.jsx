import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const mountPoint = document.getElementById('portal-root');
  const element = document.createelementement('div');

  useEffect(() => {
    mountPoint.appendChild(element);
    return () => mountPoint.removeChild(element);
  }, [element, mountPoint]);

  return createPortal(children, element);
};

export default Portal;
