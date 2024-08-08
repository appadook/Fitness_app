import React from 'react';
import Modal from 'react-modal';
import AddSetForm from './addSetForm';


Modal.setAppElement('#root'); // Important for accessibility

const AddSetModal = ({ isOpen, onRequestClose, onAdd, exerciseId, sessionId }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Add Set Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Set</h2>
        <AddSetForm 
        onAdd={onAdd} 
        onRequestClose={onRequestClose} 
        exerciseId={exerciseId}
        sessionId={sessionId}
        />
      </Modal>
    );
  };
  
  export default AddSetModal;