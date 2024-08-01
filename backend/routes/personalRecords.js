// PR = personalRecords
const express = require('express');
const router = express.Router();
const db = require('../db');
const tableName = 'personal_records';

// Get all PRs
router.get('/', (req, res) => {
    db.query('SELECT * FROM personal_records ORDER BY id ASC', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data');
        return;
      }
      res.json(results);
    });
  });
  
  // Add a new PR
  router.post('/', (req, res) => {
      const { weight, exercise } = req.body;
      const query = 'INSERT INTO personal_records (weight, exercise) VALUES ($1, $2) RETURNING *';
      const values = [weight, exercise];
    
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
      const { weight, exercise} = req.body;
      const query = 'UPDATE personal_records SET weight = $1, exercise = $2 WHERE id = $3 RETURNING *';
      const values = [weight, exercise, id];
    
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error updating personal record', err);
          res.status(500).send('Error updating PR');
          return;
        }
        if (result.rows.length === 0) {
          res.status(404).send('personal record not found');
          return;
        }
        res.status(200).json(result.rows[0]);
      });
    });
  
    
  // Delete a workout
  router.delete('/:id', (req, res) => {
      const { id } = req.params;
      const query = 'DELETE FROM personal_records WHERE id = $1 RETURNING *';
      const values = [id];
    
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error deleting PR', err);
          res.status(500).send('Error deleting PR');
          return;
        }
        if (result.rows.length === 0) {
          res.status(404).send('PR not found');
          return;
        }``
        res.status(200).send('PR deleted');
      });
    });
  
  module.exports = router;
  