import React, { useState, useEffect } from 'react';
import SessionItem from './sessionItem';
import apis from '../../services/api';


const WeekItem = ({ weekNumber, weekId, onDeleteWeek, onDeleteSession, workoutId }) => {
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions(workoutId, weekId);
  }, [workoutId, weekId]);

  const fetchSessions = async (workoutId, weekId) => {
    try {
      const response = await apis.getSessions(workoutId, weekId);
      setData(response.data.rows);

    } catch (error) {
      console.error('Error fetching sessions data', error);
      setError('Failed to fetch data');
    }
  };


  return (
    <div className="week-section">
      <h2>Week {weekNumber}</h2>
      <button onClick={() => onDeleteWeek(weekId)}>Delete Week</button>
      <button onClick={() => onAddSession(weekId)}>Add Session</button>
      {data.length > 0 ? (
        <ul className="sessions-list">
        {data.map((session) => (
          <SessionItem 
            key={session.session_id} 
            session={session} 
            onDeleteSession={onDeleteSession} 
            workoutId={workoutId} 
          />
        ))}
      </ul>
      ) : (
        <p>No sessions available for week {weekNumber}</p>
      )}
    </div>
  );
};

export default WeekItem;
