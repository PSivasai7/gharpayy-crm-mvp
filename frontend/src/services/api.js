import axios from 'axios';
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const fetchDashboardStats = () => API.get('/leads/stats');
export const fetchAllLeads = () => API.get('/leads');
export const updateLeadStage = (id, status, agentId) => API.put(`/leads/${id}/stage`, { status, agentId });
export const captureLead = (data) => API.post('/leads/webhook', data);

export const scheduleVisit = (data) => API.post('/visits', data);
export const fetchAllVisits = () => API.get('/visits');
export const updateVisitOutcome = (id, outcome) => API.put(`/visits/${id}/outcome`, { outcome });

export default API;