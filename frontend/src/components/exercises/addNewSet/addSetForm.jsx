import React, { useState } from 'react';

// Needs to be changed appropriately!!!!

const AddSetForm = ({ onAdd, onRequestClose, exerciseId, sessionId }) => {
  const [newSet, setnewSet] = useState({ set_number: '', reps: '', weight: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewSet({
      ...newSet,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(sessionId, exerciseId, newSet);
    setnewSet({});
    onRequestClose(); // Close the modal after adding the workout
  };

  return (
    <form onSubmit={handleSubmit} className="add-set-form">
      <input
        type="number"
        name="set_number"
        value={newSet.set_number}
        onChange={handleInputChange}
        placeholder="Set #"
        required
      />
      
      <input
        type="number"
        name="reps"
        value={newSet.reps}
        onChange={handleInputChange}
        placeholder="reps"
        required
      />
      
      <input
        type="number"
        name="weight"
        value={newSet.weight}
        onChange={handleInputChange}
        placeholder="Weight"
        required
      />
      <button type="submit" className="submit-btn">Add Set</button>
      <button type="button" className="delete-btn" onClick={onRequestClose}>Cancel</button>
    </form>
  );
};

export default AddSetForm;
