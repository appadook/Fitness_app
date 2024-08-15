// Setting up Express server
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 

const workoutsRoutes = require('./routes/workouts');
const personalRecordsRoutes = require('./routes/personalRecords');
const weeksSessionsRoutes = require('./routes/weeksSessions');
const exerciseDetails = require('./routes/exercise');
const usersRoutes = require('./routes/users');

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow cookies to be sent with requests
  }));
  
app.use(express.json());

app.use('/api/workouts', workoutsRoutes);
app.use('/api/personal-records', personalRecordsRoutes);
app.use('/api/weeksSessions', weeksSessionsRoutes);
app.use('/api/exercise', exerciseDetails);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});