import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
        🎌 Anime Quiz
      </h1>

      <p className="text-gray-300 text-center max-w-xl mb-8">
        Guess the anime character from the image. One wrong answer and the quiz
        ends. How far can your streak go?
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => navigate("/quiz")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
        >
          ▶ Play as Guest
        </button>

        {!isAuthenticated && (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gray-700 hover:bg-gray-600 transition px-6 py-3 rounded-lg font-semibold"
          >
            🔐 Login / Register
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="my-8 w-full max-w-sm flex items-center">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="mx-3 text-gray-400 text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>

      {/* Secondary actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/leaderboard")}
          className="text-sm text-gray-300 hover:text-white underline"
        >
          View Leaderboard
        </button>

        <button
          onClick={() => navigate("/quiz")}
          className="text-sm text-gray-300 hover:text-white underline"
        >
          Start Quiz
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-500">
        Built with ❤️ using React, Node.js & Redis
      </footer>
    </div>
  );
};

export default Landing;
