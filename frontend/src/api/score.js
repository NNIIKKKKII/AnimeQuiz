import axios from "axios";
const API_URL = "http://localhost:5000";

export const submitScore = async (score, streak, total) => {
  return axios.post(`${API_URL}/api/score/submit`, {
    score: score,
    streak: streak,
    totalQuestions: total,
  });
};

export const getLeaderboard = (page = 1) => {
  return axios.get(`${API_URL}/api/score/leaderboard?page=${page}`);
};
