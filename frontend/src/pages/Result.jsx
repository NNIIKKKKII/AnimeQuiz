import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitScore } from "../api/score";
import { useAuth } from "../context/AuthContext";

const getTitle = (score) => {
  if (score >= 70) return "Otaku 🐉";
  if (score >= 50) return "Welcome to the Anime Club 🎌";
  if (score >= 30) return "Anime Guy, huh? 👀";
  return "Keep Watching 👶";
};

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { score, streak, total } = location.state || {};

  // Guard: prevent direct access
  useEffect(() => {
    if (score === undefined) {
      navigate("/");
    }
  }, [score, navigate]);

  // Save score (only if logged in)
  useEffect(() => {
    if (isAuthenticated && score !== undefined) {
      submitScore(score, streak, total).catch(() => {
        console.error("Failed to save score");
      });
    }
  }, [isAuthenticated, score, streak, total]);

  if (score === undefined) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Quiz Finished 🎉</h1>

      <p className="text-xl mb-2">
        Score: <span className="font-bold">{score}</span>
      </p>

      <p className="mb-2">
        Streak: <span className="font-bold">{streak}</span>
      </p>

      <p className="mb-6">
        Questions Answered: <span className="font-bold">{total}</span>
      </p>

      <h2 className="text-2xl font-semibold mb-6">
        {getTitle(score)}
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/quiz")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Play Again
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Result;
