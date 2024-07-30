import React, { useState } from 'react';

const AddSessionForm = ({ onAdd, onRequestClose , workoutId}) => {
  const [newSession, setnewSession] = useState({ session_name: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewSession({
      ...newSession,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newSession);
    setnewSession({});
    onRequestClose(); // Close the modal after adding the workout
  };

  return (
    <form onSubmit={handleSubmit} className="add-session-form">
      <input
        type="text"
        name="session_name"
        value={newSession.session_name}
        onChange={handleInputChange}
        placeholder="Session Name"
        required
      />
      <button type="submit" className="submit-btn">Add Session</button>
      <button type="button" className="delete-btn" onClick={onRequestClose}>Cancel</button>
    </form>
  );
};

export default AddSessionForm;
