# Fitness Tracker Web App

## Overview

A full-stack fitness tracking app that allows users to log in, manage workouts, track exercises, and monitor personal records. Built with React, Express.js, PostgreSQL, and Supabase for authentication.

## Tech Stack

### Front-End
- React
- React Router
- Axios
- Supabase (Authentication)

### Back-End
- Node.js
- Express.js
- PostgreSQL

## Installation

1. **Clone the repo:**

2. **Install dependencies:**
- Backend:
  ```
  cd backend
  npm install
  ```
- Frontend:
  ```
  cd frontend
  npm install
  ```

3. **Environment Variables:**
- Backend (.env):
  ```
  DATABASE_URL=your_postgresql_url
  JWT_SECRET=your_jwt_secret
  ```
- Frontend (.env):
  ```
  REACT_APP_SUPABASE_URL=your_supabase_url
  REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

4. **Run the app:**
  ```
  npm start
  ```

## Features

- User authentication (Supabase)
- Workout creation and management
- Personal records tracking
- Responsive design

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a pull request

## License

MIT License


