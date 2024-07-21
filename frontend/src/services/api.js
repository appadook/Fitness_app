import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// workouts requests
export const getWorkouts = () => api.get('/workouts');
export const createWorkout = (workout) => api.post('/workouts', workout);
export const updateWorkout = (id, workout) => api.put(`/workouts/${id}`, workout);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);

// PR requests
export const getPr = () => api.get('/personal-records');
export const createPR = (pr) => api.post('/personal-records', pr);
export const updatePR = (id, pr) => api.put(`/personal_records/${id}`, pr);
export const deletePR = (id) => api.delete(`/personal-records/${id}`);


const apis = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getPr,
  createPR,
  updatePR,
  deletePR
};

export default apis;
