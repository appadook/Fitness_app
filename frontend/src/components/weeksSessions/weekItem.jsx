import React from 'react';
import SessionItem from './sessionItem';

const WeekItem = ({ weekNumber, weekId, sessions, onDeleteWeek, onDeleteSession, workoutId }) => {
  return (
    <div className="week-section">
      <h2>Week {weekNumber}</h2>
      <button onClick={() => onDeleteWeek(weekId)}>Delete Week</button>
      <ul className="sessions-list">
        {sessions.map((session) => (
          <SessionItem 
            key={session.session_id} 
            session={session} 
            onDeleteSession={onDeleteSession} 
            workoutId={workoutId} 
          />
        ))}
      </ul>
    </div>
  );
};

export default WeekItem;
