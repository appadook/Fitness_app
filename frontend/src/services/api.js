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

//weeksSessions requests
export const getWkSess = (weekId) => api.get(`/weeksSessions/${weekId}`);
export const createWkSess = (weekSession) => api.post(`/weeksSessions`, weekSession);
export const updateWkSession = (weekId, weekSession) => api.put(`/weeksSessions/${weekId}`, weekSession);
export const deleteSession = (sessionId) => api.delete(`/weeksSession/session/${sessionId}`);
export const deleteWk = (weekId) => api.delete(`/weeksSession/${weekId}`);


const apis = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getPr,
  createPR,
  updatePR,
  deletePR,
  getWkSess,
  createWkSess,
  updateWkSession,
  deleteSession,
  deleteWk
};

export default apis;
