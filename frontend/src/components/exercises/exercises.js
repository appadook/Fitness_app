import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import apis from '../../services/api'; // Import the api functions
// import './Exercises.css';

const Exercises = () => {
    const { workoutId, sessionId } = useParams(); // Get the workoutId from the URL
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    return (
    <div className="weeks-sessions-container">
      <h1>Exercises for {sessionId}</h1>
      {error && <p>{error}</p>}
    </div>

    );
};

export default Exercises;