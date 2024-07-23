const express = require('express');
const router = express.Router();
const db = require('../db');



// GET route to fetch data on exercises and tthe sets that go with it
router.get('/:sessionId', async (req, res) => {
    const sessionId = req.params.sessionId;

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
        const values =[sessionId];
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





module.exports = router;