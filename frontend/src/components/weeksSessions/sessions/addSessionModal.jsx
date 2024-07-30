import React, { useState } from 'react';
import Modal from 'react-modal';
import AddSessionForm from './addSessionForm';

// import './AddSessionModal.css';

Modal.setAppElement('#root'); // Important for accessibility

const AddSessionModal = ({ isOpen, onRequestClose, onAdd, workoutId }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Add Week Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Week</h2>
        <AddSessionForm onAdd={onAdd} onRequestClose={onRequestClose} workoutId={workoutId} />
      </Modal>
    );
  };
  
  export default AddSessionModal;