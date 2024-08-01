import React, { useEffect, useState } from 'react';
import apis from '../../services/api';
import AddPrModal from './AddPrModal';
import './PersonalRecords.css';


const PersonalRecords = () => {
  const [data, setData] = useState([]); // Stores fetched personal records
  const [editData, setEditData] = useState({}); // Stores current editable fields
  const [error, setError] = useState(null); // Stores error messages
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPersonalRecords();
  }, []);

  const fetchPersonalRecords = async () => {
    try {
      const response = await apis.getPr();
      if (Array.isArray(response.data.rows)) {
        setData(response.data.rows); // Updates data with fetched records if it is an array
        console.log("data is:", response.data.rows);
      } else {
        console.error('Fetched data is not an array:', response.data.rows);
        setError('Fetched data is not an array');
      }
    } catch (error) {
      console.error('Error fetching personal records', error);
      setError('Failed to fetch data');
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value, // Updates editData with new value for the specific field (weight or exercise)
      },
    }));
  };

  const handleSave = async (id, exercise) => {
    const updatedWeight = editData[id];
    try {
      await apis.updatePR(id, {
        weight: updatedWeight.weight,
        exercise: exercise
      });
      fetchPersonalRecords(); // Refreshes data after update
    } catch (error) {
      console.error('Error updating personal record', error);
      setError('Failed to update data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apis.deletePR(id);
      setData(prevData => prevData.filter(pr => pr.id !== id));
      fetchPersonalRecords();
    } catch (error) {
      console.error('Error deleting PR', error);
      setError('Failed to delete PR');
    }
  };

  const handleAddPr = async (newPr) => {
    try {
      const response = await apis.createPR(newPr);
      setData((prevData) => [...prevData, response.data]);
      fetchPersonalRecords();
    } catch (error) {
      console.error('Error adding personal record', error);
      setError('Failed to add personal record');
    }
  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="personal-records-page">
      <h1>Personal Records Page</h1>
      <button className='new-pr-btn' onClick={openModal}>New PR</button>
      <AddPrModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAdd={handleAddPr}
      />
      <div className="personal-records-container">
      {error && <p className="error">{error}</p>}
      {Array.isArray(data) && data.length > 0 ? (
        data.map((record) => (
          <div key={record.id} className="record-item">
            <h2>{record.exercise}</h2>
            <input
              type="number"
              value={editData[record.id]?.weight || record.weight}
              onChange={(e) => handleInputChange(record.id, 'weight', e.target.value)}
              
            />
            <button onClick={() => handleSave(record.id, record.exercise)}>Save</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No personal records found.</p>
      )}
      </div>
      
    </div>
  );
};

export default PersonalRecords;
