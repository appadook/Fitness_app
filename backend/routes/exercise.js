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
            ed.weight,
            ed.id as set_id,
            ed.exercise_id
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
            const { exercise_name, set_number, reps, weight, set_id, exercise_id } = row;
            if (!acc[exercise_name]) {
                acc[exercise_name] = {
                  sets: [],
                  exercise_id: exercise_id
                };
              }
            acc[exercise_name].sets.push({ set_id, set_number, reps, weight });
            return acc;
        }, {});
        
        res.json(groupedData);
        } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
});

// POST route to add a new exercise and its details
// router.post('/:session_id', async (req, res) => {
//     // const { session_id, exercises } = req.body;
//     const {exercises} = req.body;
//     const session_id = req.params.session_id;

//     try {
//       await db.query('BEGIN'); // Begin transaction
  
//       for (const exercise of exercises) {
//         const { exercise_name, sets } = exercise;
  
//         // Insert the exercise
//         const insertExerciseQuery = `
//           INSERT INTO exercises (exercise_name, session_id)
//           VALUES ($1, $2)
//           RETURNING id;
//         `;
//         const exerciseValues = [exercise_name, session_id];
//         const result = await db.query(insertExerciseQuery, exerciseValues);
//         const exerciseId = result.rows[0].id;
  
//         // Insert the sets for the exercise
//         for (const set of sets) {
//           const { set_number, reps, weight } = set;
  
//           const insertSetQuery = `
//             INSERT INTO exercise_details (exercise_id, set_number, reps, weight)
//             VALUES ($1, $2, $3, $4);
//           `;
//           const setValues = [exerciseId, set_number, reps, weight];
//           await db.query(insertSetQuery, setValues);
//         }
//       }
  
//       await db.query('COMMIT'); // Commit transaction
//       res.status(201).json({ message: 'Exercises and sets added successfully' });
//       await db.query('COMMIT'); // Commit transaction
//     } catch (err) {
//       await db.query('ROLLBACK'); // Rollback transaction on error
//       console.error('Error adding exercises and sets', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

router.post('/:session_id', async (req, res) => {
  const { session_id } = req.params; 
  const { exercise_name } = req.body; 

  
  try{
    await db.query('BEGIN');

    const addExerciseQuery = `
    INSERT INTO exercises (exercise_name, session_id) VALUES 
    ($1, $2) RETURNING *
    `;
    const exerciseValues = [exercise_name, session_id];
    const exerciseResult = await db.query(addExerciseQuery, exerciseValues);

    await db.query('COMMIT');

    res.status(201).json({ 
      exercise : exerciseResult.rows[0],
      message: 'Exercise added successfully' 
    });
  }catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error adding exercise', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

// POST route to add a new set to an exercise
router.post('/:session_id/:exercise_id', async (req, res) => {
  const exercise_id = req.params.exercise_id;
  const { set_number, reps, weight } = req.body;
  
  try{
    await db.query('BEGIN');

    const addSetQuery = `
    INSERT INTO exercise_details (set_number, reps, weight, exercise_id) VALUES 
    ($1, $2, $3, $4) RETURNING *
    `;
    const setValues = [set_number, reps, weight, exercise_id];
    const setResult = await db.query(addSetQuery, setValues);

    await db.query('COMMIT');

    res.status(201).json({ 
      set : setResult.rows[0],
      message: 'set added successfully' 
    });
  }catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error adding set', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// PUT route to update an exercise and its details
router.put('/:session_id/:exercise_id', async (req, res) => {
    const session_id = req.params.session_id;
    const exercise_id = req.params.exercise_id;
    const { exercise_name, sets } = req.body;
  
    try {
      await db.query('BEGIN'); // Begin transaction
  
      // Update the exercise name
      const updateExerciseQuery = `
        UPDATE exercises
        SET exercise_name = $1
        WHERE id = $2;
      `;
      await db.query(updateExerciseQuery, [exercise_name, exercise_id]);
  
      // Delete existing sets
      const deleteSetsQuery = `
        DELETE FROM exercise_details
        WHERE exercise_id = $1;
      `;
      await db.query(deleteSetsQuery, [exercise_id]);
  
      // Insert updated sets
      for (const set of sets) {
        const { set_number, reps, weight } = set;
        const insertSetQuery = `
          INSERT INTO exercise_details (exercise_id, set_number, reps, weight)
          VALUES ($1, $2, $3, $4);
        `;
        await db.query(insertSetQuery, [exercise_id, set_number, reps, weight]);
      }
  
      await db.query('COMMIT'); // Commit transaction
      res.status(200).json({ message: 'Exercise and sets updated successfully' });
    } catch (err) {
      await db.query('ROLLBACK'); // Rollback transaction on error
      console.error('Error updating exercise and sets', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // DELETE route to delete an exercise and its details
router.delete('/:session_id/:exercise_id', async (req, res) => {
    const exercise_id = req.params.exercise_id;
    const seesion_id = req.params.session_id;
  
    try {
      await db.query('BEGIN'); // Begin transaction
  
      // Delete the sets
      const deleteSetsQuery = `
        DELETE FROM exercise_details
        WHERE exercise_id = $1;
      `;
      await db.query(deleteSetsQuery, [exercise_id]);
  
      // Delete the exercise
      const deleteExerciseQuery = `
        DELETE FROM exercises
        WHERE id = $1;
      `;
      await db.query(deleteExerciseQuery, [exercise_id]);
  
      await db.query('COMMIT'); // Commit transaction
      res.status(200).json({ message: 'Exercise and sets deleted successfully' });
    } catch (err) {
      await db.query('ROLLBACK'); // Rollback transaction on error
      console.error('Error deleting exercise and sets', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

   // DELETE route to delete a set in for an exercise
router.delete('/:set_id', async (req, res) => {
  const set_id = req.params.set_id;

  try {
    await db.query('BEGIN'); // Begin transaction

    // Delete the sets
    const deleteSetQuery = `
      DELETE FROM exercise_details
      WHERE id = $1;
    `;
    await db.query(deleteSetQuery, [set_id]);

    await db.query('COMMIT'); // Commit transaction
    res.status(200).json({ message: 'Set deleted successfully' });
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error deleting set', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;