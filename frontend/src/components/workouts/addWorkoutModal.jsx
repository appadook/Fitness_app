import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddWorkoutModal.css';

Modal.setAppElement('#root'); // Important for accessibility

const AddWorkoutModal = ({ isOpen, onRequestClose, onAdd }) => {
  const [newWorkout, setNewWorkout] = useState({ name: '', purpose: '', active: false });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWorkout({
      ...newWorkout,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newWorkout);
    setNewWorkout({ name: '', purpose: '', active: false });
    onRequestClose(); // Close the modal after adding the workout
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Workout Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit} className="add-workout-form">
        <input
          type="text"
          name="name"
          value={newWorkout.name}
          onChange={handleInputChange}
          placeholder="Workout Name"
          required
        />
        <input
          type="text"
          name="purpose"
          value={newWorkout.purpose}
          onChange={handleInputChange}
          placeholder="Purpose"
          required
        />
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={newWorkout.active}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Workout</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddWorkoutModal;
