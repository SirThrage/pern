import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Focus from 'react-focus-lock';

import './Modal.scss';

export const Modal = ({ className, onClose = () => {}, children, persistent, ...props }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      if ( !document.getElementsByClassName( 'modal' ).length ) document.body.style.overflowY = 'auto';
      onClose();
    };
  }, [ onClose ] );

  return createPortal (
    <Focus>
      <div
        className={ `modal${ className ? ` ${ className }` : '' }` }
        { ...props }
      >
        <button
          tabIndex={ persistent ? -1 : 0 }
          onClick={ onClose }
          disabled={ persistent }
        />
        { children }
      </div>
    </Focus>, document.body
  )
}
