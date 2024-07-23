import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import apis from '../../services/api'; // Import the api functions
import './WeeksSessions.css';

const WeeksSessions = () => {
  const { workoutId } = useParams(); // Get the workoutId from the URL
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeeksAndSessions();
  }, [workoutId]); // Re-fetch data when workoutId changes

  const fetchWeeksAndSessions = async () => {
    try {
    //   const response = await axios.get(`http://localhost:3001/weeksSessions/${workoutId}`);
    const response = await apis.getWkSess(workoutId);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching weeks and sessions data', error);
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="weeks-sessions-container">
      <h1>Weeks and Sessions for Workout {workoutId}</h1>
      {error && <p>{error}</p>}
      {Object.keys(data).map((week) => (
        <div key={week} className="week-section">
          <h2>Week {week}</h2>
          <ul className="sessions-list">
            {data[week].map((session) => (
              <li key={session.session_id}>
                {session.session_name}
                <Link to={`/weeksSessions/${workoutId}/${session.session_id}`}>
                  Click here to see exercises for {session.session_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeeksSessions;
