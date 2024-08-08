import React, { useEffect, useState } from 'react';
import apis from '../../services/api'; // Import the api functions
import WorkoutItem from './workoutItem';
import AddWorkoutModal from './addWorkoutModal';
import './workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null); // Add state to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW CODE


  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await apis.getWorkouts();
      if (Array.isArray(response.data.rows)) {
        setWorkouts(response.data.rows);
      } else {
        setError('Fetched data is not an array');
      }
    } catch (error) {
      console.error('Error fetching workouts', error);
      setError('Failed to fetch workouts');
    }
  };

  const handleAddWorkout = async (newWorkout) => {
    try {
      const response = await apis.createWorkout(newWorkout);
      setWorkouts([...workouts, response.data]);
    } catch (error) {
      console.error('Error adding workout', error);
      setError('Failed to add workout');
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await apis.deleteWorkout(id);
      setWorkouts(workouts.filter(workout => workout.id !== id));
    } catch (error) {
      console.error('Error deleting workout', error);
      setError('Failed to delete workout');
    }
  };

  const handleToggleActive = async (id, active) => { 
    try {
     
      const response = await apis.toggleActiveWorkout(id, active); 
     
      setWorkouts(workouts.map(workout => workout.id === id ? response.data : workout)); 
    } catch (error) {
      console.error('Error updating active status', error); 
      setError('Failed to update active status'); 
    } 
  }; 

  const openModal = () => setIsModalOpen(true); // NEW CODE
  const closeModal = () => setIsModalOpen(false); // NEW CODE

  return (
    <div className="workouts-container">
      <h1>Workout Program Dashboard</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <button onClick={openModal} className='add-workout-btn'>Add Workout</button> 
      <AddWorkoutModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={handleAddWorkout}
      /> {/* NEW CODE */}
      <ul className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutItem 
            key={workout.id} 
            workout={workout} 
            onDelete={handleDeleteWorkout}
            onToggleActive={handleToggleActive} />
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </ul>
    </div>
  );
};

export default Workouts;
