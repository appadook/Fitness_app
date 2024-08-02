import React from 'react';
import { Link } from 'react-router-dom';
import './SessionItem.css';

const SessionItem = ({ session, onDeleteSession, workoutId }) => {
  return (
    <li className="session-item">
      <Link to={`/weeksSessions/${workoutId}/${session.session_id}/${session.session_name}`} className="session-name">
        {session.session_name}
      </Link>
      <button onClick={() => onDeleteSession(session.session_id)}>Delete Sess</button>
    </li>
  );
};

export default SessionItem;

