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

   // PUT route to update the active status of a workout
router.put('/toggle-active/:id', async (req, res) => {
  const workoutId = req.params.id;
  const { active } = req.body;

  try {
    const query = `
      UPDATE workouts
      SET active = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [active, workoutId];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating active status', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  
// Delete a workout
router.delete('/:id', (req, res) => {
    const { id } = req.params;

      // Delete from exercise_details
      const deleteExerciseDetailsQuery = `
      DELETE FROM exercise_details
      WHERE exercise_id IN (
          SELECT e.id FROM exercises e
          JOIN sessions s ON e.session_id = s.id
          JOIN weeks w ON s.week_id = w.id
          WHERE w.workout_id = $1
      )
  `;
    db.query(deleteExerciseDetailsQuery, [id]);

    // Delete from exercises
    const deleteExercisesQuery = `
        DELETE FROM exercises
        WHERE session_id IN (
            SELECT s.id FROM sessions s
            JOIN weeks w ON s.week_id = w.id
            WHERE w.workout_id = $1
        )
    `;
    db.query(deleteExercisesQuery, [id]);

    // Delete from sessions
    const deleteSessionsQuery = `
        DELETE FROM sessions
        WHERE week_id IN (
            SELECT w.id FROM weeks w
            WHERE w.workout_id = $1
        )
    `;
    db.query(deleteSessionsQuery, [id]);

    // Delete from weeks
    const deleteWeeksQuery = `
        DELETE FROM weeks
        WHERE workout_id = $1
    `;
    db.query(deleteWeeksQuery, [id]);

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
