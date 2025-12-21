import axios from "axios";

const API_URL = "http://localhost:5000";

export const getRandomCharacter = () => {
  return axios.get(`${API_URL}/api/quiz/random`);
};

export const verifyAnswer = (id, guess) => {
  return axios.post(`${API_URL}/api/quiz/verify`, { id, guess });
};
