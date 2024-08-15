import React from 'react';
import './home.css'; // Assuming you want to add specific styles for your home page
import Card from './card';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Fitness Tracker</h1>
      <p>Your one-stop solution for tracking workouts and personal records.</p>
      <div className='card-container'>
        <Card 
          title= "Workouts"
          link = "/workouts"
          description = "'A link to the all & current workouts'"
        />
      <Card 
          title= "Personal Records"
          link = "/personal-records"
          description = "'All my PRs'"
        />
      </div>
      
    </div>
  );
};

export default Home;