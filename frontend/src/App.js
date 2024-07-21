import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/Home/home';
import Workouts from './components/workouts/workouts';
// import PersonalRecords from './components/PersonalRecords/PersonalRecords';
// import LogWorkout from './components/LogWorkout/LogWorkout';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        {/* <Route path="/personal-records" element={<PersonalRecords />} /> */}
        {/* <Route path="/log-workout" element={<LogWorkout />} /> */}
      </Routes>
      </div>
    </Router>
  );
};

export default App;

