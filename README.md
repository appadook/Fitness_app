Fitness Tracker Web App
Overview
This Fitness Tracker Web App is a full-stack application built to help users manage and track their workouts, exercises, and personal records. The application allows users to log in, create workouts, track progress over time, and view detailed statistics on their performance. The app is built with a React front-end, an Express.js/Node.js back-end, and uses PostgreSQL for database management. Authentication is managed through Supabase.


Tech Stack
  Front-End
    React: JavaScript library for building user interfaces.
    React Router: For routing and navigation.
    Axios: For making HTTP requests.
    Material-UI: Pre-built React components implementing Google’s Material Design.
    Supabase: For authentication and managing user sessions.
  Back-End
    Node.js: JavaScript runtime.
    Express.js: Web framework for Node.js.
    PostgreSQL: Relational database management system.
    Supabase: For managing user authentication.

  Docker: Containerization of the application for easier deployment.
  GitHub Actions: Continuous Integration and Deployment (CI/CD).

Installation
Prerequisites
Node.js & npm
PostgreSQL
Docker (optional, for containerization)

To run application
  -> npm install
  -> npm start

Usage
Login/Signup: Use the login page to create an account or log in.
Dashboard: Access your workout dashboard to view, create, and manage workouts.
Personal Records: Track your personal records and view progress over time.

Authentication
Authentication is handled via Supabase, which supports email/password and third-party logins (e.g., Google). The Supabase client is configured in supabaseClient.js.
