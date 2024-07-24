import React, { useState } from 'react';

const AddWorkoutForm = ({ onAdd }) => {
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
  };

  return (
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
    </form>
  );
};

export default AddWorkoutForm;
