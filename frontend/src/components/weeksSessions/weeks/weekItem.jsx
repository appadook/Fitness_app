import React, { useState, useEffect } from 'react';
import SessionItem from '../sessions/sessionItem';
import apis from '../../../services/api';
import AddSessionModal from '../sessions/addSessionModal';
import './WeekItem.css';


const WeekItem = ({ weekNumber, weekId, onDeleteWeek, onDeleteSession, workoutId }) => {
  
  const [data, setData] = useState([]);
  const [setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const handleAddSession = async (newSession) => {
    console.log("weekId:", weekId);
    console.log("new session is:", newSession);
    try{
      const response = await apis.createSession(weekId, newSession);
      const newSessionData = response.data;

      // Update the state with the new week data
      setData(prevData => ([
        ...prevData,
        newSessionData
      ]));

      console.log("response is:", response);
      console.log("newSessionData:", newSessionData);
      console.log("data is:", data);

      fetchSessions(workoutId, weekId);
    }
    catch (error) {
      console.error('Error adding new session', error);
      setError('Failed to add data');
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await apis.deleteSession(sessionId);

      // Remove the session from the state
      setData(prevData => prevData.filter(session => session.id !== sessionId));
      fetchSessions(workoutId, weekId);

      
    } catch (error) {
      console.error('Error deleting session', error);
      setError('Failed to delete session');
    }
  };


  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="week-section">
      <h2>Week {weekNumber}</h2>
      <button className="delete-btn" onClick={() => onDeleteWeek(weekId)}>Delete Week</button>
      <button onClick={openModal} className='add-session-btn'>Add Session</button>
      <AddSessionModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={handleAddSession}
        workoutId={workoutId}
      /> 
      {data.length > 0 ? (
        <ul className="sessions-list">
        {data.map((session) => (
          <SessionItem 
            key={session.session_id} 
            session={session} 
            onDeleteSession={handleDeleteSession} 
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
