import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apis from '../../services/api'; // Import the api functions
import './WeeksSessions.css';
import WeekItem from './weekItem';
import AddWeekModal from './addWeekModal';

const WeeksSessions = () => {
  const { workoutId } = useParams(); // Get the workoutId from the URL
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWeeksAndSessions();
  }, [workoutId]); // Re-fetch data when workoutId changes

  const fetchWeeksAndSessions = async () => {
    try {
      const response = await apis.getWeeks(workoutId);
      setData(response.data);

    } catch (error) {
      console.error('Error fetching weeks and sessions data', error);
      setError('Failed to fetch data');
    }
  };

  const handleAddWeek = async (newWeek) => {
    try {
      const response = await apis.createWeek(newWeek);
      fetchWeeksAndSessions();
      const newWeekData = response.data.week;

      
      // Update the state with the new week data
      setData(prevData => ({
        ...prevData,
        [newWeekData.week_number]: {
          week_id: newWeekData.id,
          sessions: []
        }
      }));
    } catch (error) {
      console.error('Error adding week', error);
      setError('Failed to add week');
    }
  };

  const handleDeleteWeek = async (weekId) => {
    try{
      await apis.deleteWk(weekId);
      fetchWeeksAndSessions();
    }catch(error){
      console.error('Error deleting week', error);
      setError('Failed to delete week');
    }
  };

  const handleDeleteSession = async(sessionId) => {
    try{
      await apis.deleteSession(sessionId);
      console.log(sessionId);
      fetchWeeksAndSessions();
    }catch (error) {
      console.error('Error deleting session', error);
      setError('Failed to delete session');
    }
  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="weeks-sessions-container">
      <h1>Program Breakdown</h1>
      {error && <p>{error}</p>}
      <button onClick={openModal}>Add Week</button> 
      <AddWeekModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={handleAddWeek}
        workoutId={workoutId}
      /> 

      {data.rows && data.rows.map((item) => (
        <WeekItem
          key={item.week_number}
          weekNumber={item.week_number}
          weekId={item.week_id}
          onDeleteWeek={handleDeleteWeek}
          onDeleteSession={handleDeleteSession}
          workoutId={item.workoutId}
        />
      ))}
     
      {/* {Object.keys(data.rows).map((week) => (
       <WeekItem 
        key={week}
        weekNumber={week}
        weekId={data[week].week_id}
        sessions={data[week].sessions}
        onDeleteWeek={handleDeleteWeek}
        onDeleteSession={handleDeleteSession}
        workoutId={workoutId}
     />
      ))} */}
    </div>
  );
};

export default WeeksSessions;
