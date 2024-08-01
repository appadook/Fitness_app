import React from 'react';
import Modal from 'react-modal';
import AddPrForm from './AddPrForm';

Modal.setAppElement('#root'); // Important for accessibility

const AddPrModal = ({ isOpen, onRequestClose, onAdd }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Personal Record Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Personal Record</h2>
      <AddPrForm onAdd={onAdd} onRequestClose={onRequestClose} />
    </Modal>
  );
};

export default AddPrModal;
