import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutItem = ({ workout, onDelete, onToggleActive }) => {
  return (
    <ul className="workout-item">
      <h2>{workout.name}</h2>
      <p>{workout.purpose}</p>
      <Link to={`/weeksSessions/${workout.id}`} className="view-weeks-link">
        View Weeks and Sessions
      </Link>
      {/* <span>{workout.active ? 'Active' : 'Inactive'}</span> */}
      {/*Toggle active button*/}
      <button onClick={() => onToggleActive(workout.id, !workout.active)}> 
        {workout.active ? 'Active' : 'Inactive'} 
      </button> 

      <button onClick={() => onDelete(workout.id)}>Delete Workout</button>
    </ul>
  );
};

export default WorkoutItem;
