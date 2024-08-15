const express = require('express');
const router = express.Router();
const db = require('../db');


//GET to get a user based on supabase_id
router.get('/:supabase_id', (req, res) => {
    
    
    let supabase_id = req.params.supabase_id;

    
    db.query('SELECT id FROM users WHERE supabase_id = $1', [supabase_id], (err, results) => {
        if (err) {
        res.status(500).send('Error retrieving data');
        return;
        }
        res.json(results);
  });
});

module.exports = router;
