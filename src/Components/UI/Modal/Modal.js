import React from 'react';
import Portal from '../Portal/Portal';

const Modal = props => (
  <Portal >
    <div className="Backdrop" onClick={props.backDropClick}></div>
    <div className='Modal' >
      <div className='ModalContent' >
        {props.children}
      </div>
      <button
       onClick={props.backDropClick}
       className='closeButton' >Ok</button>
    </div>
  </Portal>
)




export default React.memo(Modal);
