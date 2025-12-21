import axios from "axios";

export const getRandomCharacter = () => {
  axios.post("/api/users/random");
};

export const verifyAnswer = (id, guess) => {
  axios.post("/api/users/verify", { id, guess });
};
