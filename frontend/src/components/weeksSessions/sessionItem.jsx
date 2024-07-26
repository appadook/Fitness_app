import React from 'react';
import { Link } from 'react-router-dom';

const SessionItem = ({ session, onDeleteSession, workoutId }) => {
  return (
    <li className="session-item">
      <Link to={`/weeksSessions/${workoutId}/${session.session_id}`} className="no-visited-link">
        {session.session_name}
      </Link>
      <button onClick={() => onDeleteSession(session.session_id)}>Delete Session</button>
    </li>
  );
};

export default SessionItem;

