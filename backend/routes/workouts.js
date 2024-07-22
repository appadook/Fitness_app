const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all workouts
router.get('/', (req, res) => {
  db.query('SELECT * FROM workouts', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

// Add a new workout
router.post('/', (req, res) => {
    const { name, purpose, active } = req.body;
    const query = 'INSERT INTO workouts (name, purpose, active) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, purpose, active];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting data', err);
        res.status(500).send('Error inserting data');
        return;
      }
      res.status(201).json(result.rows[0]);
    });
  });


// Update a workout
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, purpose, active } = req.body;
    const query = 'UPDATE workouts SET name = $1, purpose = $2, active = $3 WHERE id = $4 RETURNING *';
    const values = [name, purpose, active, id];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating workout', err);
        res.status(500).send('Error updating workout');
        return;
      }
      if (result.rows.length === 0) {
        res.status(404).send('Workout not found');
        return;
      }
      res.status(200).json(result.rows[0]);
    });
  });

  
// Delete a workout
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM workouts WHERE id = $1 RETURNING *';
    const values = [id];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error deleting workout', err);
        res.status(500).send('Error deleting workout');
        return;
      }
      if (result.rows.length === 0) {
        res.status(404).send('Workout not found');
        return;
      }
      res.status(200).send('Workout deleted');
    });
  });

module.exports = router;
