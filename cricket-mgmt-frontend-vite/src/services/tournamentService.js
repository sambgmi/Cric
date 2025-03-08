import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tournaments';

const getTournaments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createTournament = async (tournamentData, token) => {
  const response = await axios.post(API_URL, tournamentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const updateTournament = async (id, tournamentData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, tournamentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteTournament = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const registerTeam = async (tournamentId, teamData, token) => {
  const response = await axios.post(`${API_URL}/${tournamentId}/register`, teamData, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export { getTournaments, createTournament, updateTournament, deleteTournament, registerTeam };