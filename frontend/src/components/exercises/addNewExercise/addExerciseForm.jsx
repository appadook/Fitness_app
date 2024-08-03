import React, { useState } from 'react';


const AddExerciseForm = ({ onAdd, onRequestClose, sessionId }) => {
  const [newExercise, setnewExercise] = useState({ exercise_name: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewExercise({
      ...newExercise,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(sessionId, newExercise);
    setnewExercise({});
    onRequestClose(); // Close the modal after adding the workout
  };

  return (
    <form onSubmit={handleSubmit} className="add-exercise-form">
      <input
        type="text"
        name="exercise_name"
        value={newExercise.exercise_name}
        onChange={handleInputChange}
        placeholder="New Exercise"
        required
      />
      <button type="submit" className="submit-btn">Add Exercise</button>
      <button type="button" className="delete-btn" onClick={onRequestClose}>Cancel</button>
    </form>
  );
};

export default AddExerciseForm;
