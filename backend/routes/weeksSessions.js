const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/:workoutId', async (req, res) => {
    const workoutId = req.params.workoutId;
    
    try {
      const query = `
        SELECT 
            wk.week_number,
            s.session_name,
            s.id AS session_id
        FROM 
            weeks wk
        JOIN 
            sessions s ON wk.id = s.week_id
        WHERE 
            wk.workout_id = $1
        ORDER BY 
            wk.week_number, s.session_name;
      `;
      const values = [workoutId];
  
      const result = await db.query(query, values);
      const groupedData = result.rows.reduce((acc, row) => {
        const { week_number, session_name, session_id } = row;
        if (!acc[week_number]) {
          acc[week_number] = [];
        }
        acc[week_number].push({session_name, session_id});
        return acc;
      }, {});
      
      res.json(groupedData);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  // POST route to add a new week and a new session
  router.post('/', async (req, res) => {
    const { workout_id, week_number, session_name } = req.body;
  
    try {
      await db.query('BEGIN');
  
      const insertWeekQuery = 'INSERT INTO weeks (workout_id, week_number) VALUES ($1, $2) RETURNING *';
      const weekValues = [workout_id, week_number];
      const weekResult = await db.query(insertWeekQuery, weekValues);
      const weekId = weekResult.rows[0].id;
  
      const insertSessionQuery = 'INSERT INTO sessions (week_id, session_name) VALUES ($1, $2) RETURNING *';
      const sessionValues = [weekId, session_name];
      const sessionResult = await db.query(insertSessionQuery, sessionValues);
  
      await db.query('COMMIT');
  
      res.status(201).json({
        week: weekResult.rows[0],
        session: sessionResult.rows[0]
      });
    } catch (err) {
      await db.query('ROLLBACK');
      console.error('Error creating new week and session', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  });


  // PUT route to update a week and its session
router.put('/:weekId', async (req, res) => {
    const { weekId } = req.params;
    const { week_number, session_name } = req.body;
  
    try {
      await db.query('BEGIN');
  
      const updateWeekQuery = 'UPDATE weeks SET week_number = $1 WHERE id = $2 RETURNING *';
      const weekValues = [week_number, weekId];
      const weekResult = await db.query(updateWeekQuery, weekValues);
  
      const updateSessionQuery = 'UPDATE sessions SET session_name = $1 WHERE week_id = $2 RETURNING *';
      const sessionValues = [session_name, weekId];
      const sessionResult = await db.query(updateSessionQuery, sessionValues);
  
      await db.query('COMMIT');
  
      res.status(200).json({
        week: weekResult.rows[0],
        session: sessionResult.rows[0]
      });
    } catch (err) {
      await db.query('ROLLBACK');
      console.error('Error updating week and session', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // DELETE route to delete a week and its sessions
router.delete('/:weekId', async (req, res) => {
    const { weekId } = req.params;
  
    try {
      await db.query('BEGIN');
  
      const deleteSessionsQuery = 'DELETE FROM sessions WHERE week_id = $1 RETURNING *';
      const sessionResult = await db.query(deleteSessionsQuery, [weekId]);
  
      const deleteWeekQuery = 'DELETE FROM weeks WHERE id = $1 RETURNING *';
      const weekResult = await db.query(deleteWeekQuery, [weekId]);
  
      await db.query('COMMIT');
  
      res.status(200).json({
        week: weekResult.rows[0],
        sessions: sessionResult.rows
      });
    } catch (err) {
      await db.query('ROLLBACK');
      console.error('Error deleting week and sessions', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } ``
  });

  
// DELETE route to delete a session within a week
router.delete('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const deleteSessionQuery = 'DELETE FROM sessions WHERE id = $1 RETURNING *';
    const sessionResult = await db.query(deleteSessionQuery, [sessionId]);

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({ session: sessionResult.rows[0] });
  } catch (err) {
    console.error('Error deleting session', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;