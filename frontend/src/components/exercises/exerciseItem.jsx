import React, { useState } from 'react';
import AddSetModal from './addNewSet/addSetModal';



const ExerciseItem = ({ exercise, details, onDeleteSet, onDeleteExercise, sessionId, exerciseId, onAddSet }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true); 
    const closeModal = () => setIsModalOpen(false);

  return (
    <div key={exercise} className="exercise-item">
            <h2>{exercise}</h2>
            <button className="save-btn" >
              Save Exercise
            </button>
            <button className="delete-btn" onClick={() => onDeleteExercise(sessionId, exerciseId)}>
              Delete Exercise
            </button>
            {details.sets.length > 0 ? 
            <table className="exercise-table">
            <thead>
              <tr>
                <th>Set Number</th>
                <th>Reps</th>
                <th>Weight (lbs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {details.sets.map((set, index) => (
                <tr key={index} className="set-item">
                  <td>{set.set_number}</td>
                  <td>
                    <input
                      type="number"
                      value={ set.reps}
                      // onChange={(e) => handleInputChange(exercise, index, 'reps', e.target.value)}
                      className="input-field"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={set.weight}
                      // onChange={(e) => handleInputChange(exercise, index, 'weight', e.target.value)}
                      className="input-field"
                    />
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => onDeleteSet(set.set_id)}>
                      Delete Set
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <p> No Exercises</p>
          }
            
            <button className='new-set-btn' onClick={openModal}> Add Set</button>
            <AddSetModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAdd={onAddSet}
                exerciseId={exerciseId}
                sessionId={sessionId}
            />
          </div>
  );
};

export default ExerciseItem;
