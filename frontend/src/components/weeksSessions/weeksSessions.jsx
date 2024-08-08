import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../../services/api'; // Import the api functions
import './WeeksSessions.css';
import WeekItem from './weeks/weekItem';
import AddWeekModal from './weeks/addWeekModal';

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


  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="weeks-sessions-container">
      <h1>Program Breakdown</h1>
      {error && <p>{error}</p>}
      <button className='add-week-btn' onClick={openModal}>Add Week</button> 
      <AddWeekModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={handleAddWeek}
        workoutId={workoutId}
      /> 

      <div className='weeks-container'>
      {data.rows && data.rows.map((item) => (
        <WeekItem className='week-item'
          key={item.week_number}
          weekNumber={item.week_number}
          weekId={item.week_id}
          onDeleteWeek={handleDeleteWeek}
          workoutId={item.workoutId}
        />
      ))}
      </div>
    </div>
  );
};

export default WeeksSessions;
