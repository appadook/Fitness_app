const express = require('express');
const router = express.Router();
const db = require('../db');



// GET route to fetch data on exercises and tthe sets that go with it
router.get('/:session_id', async (req, res) => {
    const session_id = req.params.session_id;

    try {
        const query = `
        SELECT 
            e.exercise_name,
            ed.set_number,
            ed.reps,
            ed.weight
        FROM
	        exercises e
        JOIN
            exercise_details ed on e.id = ed.exercise_id
        WHERE
        e.session_id = $1
        `;
        const values =[session_id];
        const result = await db.query(query, values);
        const groupedData = result.rows.reduce((acc, row) => {
            const { exercise_name, set_number, reps, weight } = row;
            if (!acc[exercise_name]) {
                acc[exercise_name] = {
                  sets: []
                };
              }
            acc[exercise_name].sets.push({ set_number, reps, weight });
            return acc;
        }, {});
        
        res.json(groupedData);
        } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
});

// POST route to add a new exercise and its details
router.post('/:session_id', async (req, res) => {
    // const { session_id, exercises } = req.body;
    const {exercises} = req.body;
    const session_id = req.params.session_id;

    try {
      await db.query('BEGIN'); // Begin transaction
  
      for (const exercise of exercises) {
        const { exercise_name, sets } = exercise;
  
        // Insert the exercise
        const insertExerciseQuery = `
          INSERT INTO exercises (exercise_name, session_id)
          VALUES ($1, $2)
          RETURNING id;
        `;
        const exerciseValues = [exercise_name, session_id];
        const result = await db.query(insertExerciseQuery, exerciseValues);
        const exerciseId = result.rows[0].id;
  
        // Insert the sets for the exercise
        for (const set of sets) {
          const { set_number, reps, weight } = set;
  
          const insertSetQuery = `
            INSERT INTO exercise_details (exercise_id, set_number, reps, weight)
            VALUES ($1, $2, $3, $4);
          `;
          const setValues = [exerciseId, set_number, reps, weight];
          await db.query(insertSetQuery, setValues);
        }
      }
  
      await db.query('COMMIT'); // Commit transaction
      res.status(201).json({ message: 'Exercises and sets added successfully' });
    } catch (err) {
      await db.query('ROLLBACK'); // Rollback transaction on error
      console.error('Error adding exercises and sets', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




module.exports = router;