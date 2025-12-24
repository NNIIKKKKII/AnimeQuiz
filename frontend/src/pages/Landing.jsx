import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Anime Quiz 🎌</h1>

      <p className="text-gray-300 text-center max-w-md mb-8">
        Guess the anime character from the image.
        One wrong answer and the quiz ends.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/quiz")}
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          ▶ Play as Guest
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-gray-700 hover:bg-gray-600 py-2 rounded"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-gray-700 hover:bg-gray-600 py-2 rounded"
        >
          Register
        </button>
      </div>

      <button
        onClick={() => navigate("/leaderboard")}
        className="mt-6 text-sm text-gray-400 underline"
      >
        View Leaderboard
      </button>
    </div>
  );
};

export default Landing;
