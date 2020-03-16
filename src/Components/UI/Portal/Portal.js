import React from 'react';
import ReactDOM from 'react-dom';

const Portal = props => {
  return(
    ReactDOM.createPortal(
      <aside id="modal-root">
        {props.children}
      </aside>, document.body
    )
  )
}

export default Portal;
