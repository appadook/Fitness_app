import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import apis from '../../services/api'; // Import the api functions
// import './Exercises.css';

const Exercises = () => {
    const { workoutId, sessionId } = useParams(); // Get the workoutId from the URL
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchExercisesAndDetails();
    }, [sessionId]); // Re-fetch data when workoutId changes

    const fetchExercisesAndDetails = async () => {
      try {
      const response = await apis.getExercise(sessionId);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching exercises', error);
        setError('Failed to fetch data');
      }
    };

    return (
    <div className="weeks-sessions-container">
      <h1>Exercises for {sessionId}</h1>
      {error && <p>{error}</p>}
      <ul className="session-exercises">
        {Object.entries(data).map(([exercise, details]) => (
          <div key={exercise}>
            <p>{exercise}</p>
            {details.sets.map((set, index) => (
              <p key={index}>
                Set {set.set_number}: {set.reps} reps @ {set.weight} lbs
              </p>
            ))}
          </div>
        ))}
      </ul>
    </div>

    );
};

export default Exercises;