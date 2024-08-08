import React from 'react';
import Modal from 'react-modal';
import AddWeekForm from './addWeekForm';
// import './AddWeekModal.css';

Modal.setAppElement('#root'); // Important for accessibility

const AddWeekModal = ({ isOpen, onRequestClose, onAdd, workoutId }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Add Week Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Week</h2>
        <AddWeekForm onAdd={onAdd} onRequestClose={onRequestClose} workoutId={workoutId} />
      </Modal>
    );
  };
  
  export default AddWeekModal;