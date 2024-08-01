import React, { useState } from 'react';

const AddPrForm = ({ onAdd, onRequestClose }) => {
  const [newPr, setNewPr] = useState({ exercise: '', weight: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPr((prevPr) => ({
      ...prevPr,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newPr);
    onRequestClose(); // Close the modal after adding the PR
  };

  return (
    <form onSubmit={handleSubmit} className="add-pr-form">
      <input
        type="text"
        name="exercise"
        value={newPr.exercise}
        onChange={handleInputChange}
        placeholder="Exercise"
        required
      />
      <input
        type="number"
        name="weight"
        value={newPr.weight}
        onChange={handleInputChange}
        placeholder="Weight"
        required
      />
      <button type="submit" className="submit-btn">Add Personal Record</button>
      <button type="button" className="cancel-btn" onClick={onRequestClose}>Cancel</button>
    </form>
  );
};

export default AddPrForm;
