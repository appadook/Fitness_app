import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// workouts requests
export const getWorkouts = () => api.get('/workouts');
export const createWorkout = (workout) => api.post('/workouts', workout);
export const updateWorkout = (id, workout) => api.put(`/workouts/${id}`, workout);
export const toggleActiveWorkout = (id, active) => api.put(`/workouts/toggle-active/${id}`, { active }); //Testing toggle feature for active prop
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);

// PR requests
export const getPr = () => api.get('/personal-records');
export const createPR = (pr) => api.post('/personal-records', pr);
export const updatePR = (id, pr) => api.put(`/personal-records/${id}`, pr);
export const deletePR = (id) => api.delete(`/personal-records/${id}`);

//weeksSessions requests
export const getWkSess = (weekId) => api.get(`/weeksSessions/${weekId}`);
export const getWeeks = (workoutId) => api.get(`/weeksSessions/${workoutId}`);
export const getSessions = (workoutId,weekId) => api.get(`/weeksSessions/${workoutId}/${weekId}`);
export const createWkSess = (weekSession) => api.post(`/weeksSessions`, weekSession);
export const createWeek = (week) => api.post(`/weeksSessions/`, week);
export const createSession = (weekId, session) => api.post(`/weeksSessions/${weekId}`, session);
export const updateWkSession = (weekId, weekSession) => api.put(`/weeksSessions/${weekId}`, weekSession);
export const deleteSession = (sessionId) => api.delete(`/weeksSessions/session/${sessionId}`);
export const deleteWk = (weekId, session) => api.delete(`/weeksSessions/${weekId}`, session);

// exercise requests
export const getExercise = (sessionId) => api.get(`/exercise/${sessionId}`);
export const createNewExerciseAndDetails = (sessionId) => api.post(`/exercise/${sessionId}`);
export const updateExerciseAndDetais = (sessionId, exerciseId) => api.put(`/exercise/${sessionId}/${exerciseId}`);
export const deleteExerciseAndDetails = (sessionId, exerciseId) => api.delete(`/exercise/${sessionId}/${exerciseId}`);

const apis = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  toggleActiveWorkout,
  deleteWorkout,
  getPr,
  createPR,
  updatePR,
  deletePR,
  getWkSess,
  getWeeks,
  getSessions,
  createWkSess,
  createSession,
  createWeek,
  updateWkSession,
  deleteSession,
  deleteWk,
  getExercise,
  createNewExerciseAndDetails,
  updateExerciseAndDetais,
  deleteExerciseAndDetails
};

export default apis;
