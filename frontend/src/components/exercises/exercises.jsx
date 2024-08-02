import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apis from '../../services/api'; // Import the api functions
import ExerciseItem from './exerciseItem';
import AddExerciseModal from './addNewExercise/addExerciseModal';
import './Exercises.css';

const Exercises = () => {
  const { sessionId, session } = useParams(); // Get the workoutId from the URL
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    

  useEffect(() => {
    fetchExercisesAndDetails();
  }, [sessionId]); // Re-fetch data when sessionId changes

  const fetchExercisesAndDetails = async () => {
    try {
      const response = await apis.getExercise(sessionId);
      setData(response.data);

    } catch (error) {
      console.error('Error fetching exercises', error);
      setError('Failed to fetch data');
    }
  };

  // const handleInputChange = (exercise, setIndex, field, value) => {
  //   setEditData(prevData => ({
  //     ...prevData,
  //     [exercise]: {
  //       ...prevData[exercise],
  //       sets: prevData[exercise]?.sets.map((set, index) => 
  //         index === setIndex ? { ...set, [field]: value } : set
  //       ) || [{ [field]: value }]
  //     }
  //   }));
  // };

  // const handleSave = async (exercise) => {
  //   try {
  //     const updatedExercise = {
  //       exercise_name: exercise,
  //       sets: editData[exercise]?.sets || []
  //     };
  //     await apis.updateExercise(sessionId, updatedExercise); // Assuming updateExercise API exists
  //     fetchExercisesAndDetails();
  //   } catch (error) {
  //     console.error('Error updating exercise', error);
  //     setError('Failed to update exercise');
  //   }
  // };

  const handleAddSet = async (sessionId, exerciseId, newSet) => {
    try{
      await apis.createNewSet(sessionId, exerciseId, newSet);
      fetchExercisesAndDetails();
    }catch (error) {
      console.error('Error adding new set', error);
      setError('Failed to add new set');
    }
  }

  const handleAddExercise = async () => {
    try{
      await apis.createNewSet();
      fetchExercisesAndDetails();
    }catch (error) {
      console.error('Error adding new Exercise', error);
      setError('Failed to add new Exercise');
    }
  }

  const handleDeleteExercise = async (sessionId, exerciseId) => {
    try {
      await apis.deleteExerciseAndDetails(sessionId, exerciseId);
      fetchExercisesAndDetails();
    } catch (error) {
      console.error('Error deleting exercise', error);
      setError('Failed to delete exercise');
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      await apis.deleteSet(setId); // Assuming updateExercise API exists
      fetchExercisesAndDetails();
    } catch (error) {
      console.error('Error deleting set', error);
      setError('Failed to delete set');
    }
  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="weeks-sessions-container">
      <h1>Exercises for Session: {session}</h1>
      {error && <p>{error}</p>}
      {console.log("data is:", data)}
      <button className='new-exercise-btn' onClick={openModal}> Add Exercise</button>
      <AddExerciseModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onAdd={handleAddExercise}
      />
      <div className="session-exercises">
        {Object.entries(data).map(([exercise, details]) => (
          <ExerciseItem 
            exercise={exercise}
            details={details} 
            onDeleteSet={handleDeleteSet}
            onDeleteExercise={handleDeleteExercise}
            sessionId={sessionId}
            exerciseId={details.exercise_id}
            onAddSet={handleAddSet}
          />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
