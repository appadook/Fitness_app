import React, { useEffect, useState } from 'react';
import apis from '../../services/api'; // Import the api functions
// import './Workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null); // Add state to handle errors

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

  return (
    <div className="workouts-container">
      <h1>Workouts Page</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <ul className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <h2>{workout.exercise}</h2>
              <p>{workout.purpose}</p>
              <span>{workout.active ? 'Active' : 'Inactive'}</span>
            </li>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </ul>
    </div>
  );
};

export default Workouts;
