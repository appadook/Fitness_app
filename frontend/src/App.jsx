import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/Home/home';
import Workouts from './components/workouts/workouts';
// import Header from './components/header/header';
import Footer from './components/footer/footer';
import WeekSessions from './components/weeksSessions/weeksSessions';
import Exercises from './components/exercises/exercises';
import PersonalRecords from './components/personalRecords/personalRecords';
// import LogWorkout from './components/LogWorkout/LogWorkout';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/weeksSessions/:workoutId" element={< WeekSessions/>} />
          <Route path='/weeksSessions/:workoutId/:sessionId/:session' element={<Exercises/>} />
          <Route path="/personal-records" element={<PersonalRecords/>} />
          {/* <Route path="/log-workout" element={<LogWorkout />} /> */}
        </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;

