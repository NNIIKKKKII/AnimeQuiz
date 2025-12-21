import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/score.js";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [page]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getLeaderboard(page);
      setScores(res.data);
    } catch (err) {
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && scores.length === 0 && (
        <p className="text-center text-gray-400">No scores yet.</p>
      )}

      {!loading && scores.length > 0 && (
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((row, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4">{(page - 1) * 10 + index + 1}</td>
                  <td className="py-3 px-4">{row.username}</td>
                  <td className="py-3 px-4 font-bold">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-4 py-2 rounded"
        >
          Previous
        </button>

        <span className="self-center">Page {page}</span>

        <button
          disabled={scores.length < 10}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
