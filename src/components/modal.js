import ReactModal from 'react-modal';
import Button from 'react-bootstrap/Button';
import React, {useEffect} from 'react';

ReactModal.setAppElement('#root')

export default function Modal({contentLabel, children, variant, toggleModal, showModal, overlayOff = false}) {

  const customStyles = {
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, .95)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  useEffect(() => {
    showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
 }, [showModal]);

  return (
    <>
      <Button variant={variant} onClick={toggleModal}>{contentLabel}</Button>
      <ReactModal
        isOpen={showModal}
        {...contentLabel}
        style={customStyles}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={overlayOff}
      >
        {children}
      </ReactModal>
    </>
  );
}