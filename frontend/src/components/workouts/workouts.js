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
      console.log('Fetched workouts:', response.data); // Log the response data
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts', error);
    }
  };

  return (
    <div className="workouts-container">
      <h1>Workouts Page</h1>
      <ul className="workouts-list">
        {workouts.map((workout) => (
          <li key={workout.id} className="workout-item">
            <h2>{workout.exercise}</h2>
            <p>{workout.purpose}</p>
            <span>{workout.active ? 'Active' : 'Inactive'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;