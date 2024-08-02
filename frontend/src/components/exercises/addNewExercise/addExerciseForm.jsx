import React, { useState } from 'react';


const AddExerciseForm = ({ onAdd, onRequestClose }) => {
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
    onAdd();
    setnewExercise({});
    onRequestClose(); // Close the modal after adding the workout
  };

  return (
    <form onSubmit={handleSubmit} className="add-exercise-form">
      <input
        type="number"
        name="set_number"
        value={newExercise.set_number}
        onChange={handleInputChange}
        placeholder="Set #"
        required
      />
      
      <input
        type="number"
        name="reps"
        value={newExercise.reps}
        onChange={handleInputChange}
        placeholder="reps"
        required
      />
      
      <input
        type="number"
        name="weight"
        value={newExercise.weight}
        onChange={handleInputChange}
        placeholder="Weight"
        required
      />
      <button type="submit" className="submit-btn">Add Exercise</button>
      <button type="button" className="delete-btn" onClick={onRequestClose}>Cancel</button>
    </form>
  );
};

export default AddExerciseForm;
