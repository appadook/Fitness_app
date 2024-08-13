import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/Home/home';
import Workouts from './components/workouts/workouts';
import Footer from './components/footer/footer';
import WeekSessions from './components/weeksSessions/weeksSessions';
import Exercises from './components/exercises/exercises';
import PersonalRecords from './components/personalRecords/personalRecords';
import AuthPage from './components/Login';
import { supabase } from './services/supabaseClient';
import './App.css';
import './styles/variables.css';


const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  }
  

  if (!session) {
    return (
    <AuthPage/>
  );}

  

  return (
    <Router>
      <div className='App'>
        <div className='app-container'>
          <Navbar signOut={signOut} session={session}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/weeksSessions/:workoutId" element={<WeekSessions />} />
            <Route path='/weeksSessions/:workoutId/:sessionId/:session' element={<Exercises />} />
            <Route path="/personal-records" element={<PersonalRecords />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
