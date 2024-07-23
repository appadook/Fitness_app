import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apis from '../../services/api'; // Import the api functions
import './workouts.css';

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
      <h1>Workout Program Dashboard</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <ul className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <ul key={workout.id} className="workout-item">
              <h2>{workout.name}</h2>
              <p>{workout.purpose}</p>
              <Link to={`/weeksSessions/${workout.id}`} className="view-weeks-link">
                View Weeks and Sessions
              </Link>
              <span>{workout.active ? 'Active' : 'Inactive'}</span>
            </ul>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </ul>
    </div>
  );
};

export default Workouts;
