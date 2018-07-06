import React from 'react';
import Modal from 'react-modal';

export const OptionModal = (props) => (
    <Modal 
      isOpen={!!props.selectedOption} 
      contentLabel="Selected Item"
      onRequestClose={props.actionOkPress}
    >
      <h3>Selected Item</h3>
      {props.selectedOption && <p>{props.selectedOption}</p>}
      <button onClick={props.actionOkPress}>OK</button>
    </Modal>
  );