import { useState, useEffect } from "react";
import { getRandomCharacter, verifyAnswer } from "../api/quiz";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestion] = useState(0);
  const [error, setError] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    loadRandomCharacter();
  }, []);

  const loadRandomCharacter = async () => {
    try {
      setLoading(true);
      let res = await getRandomCharacter();
      setCharacter(res.data);
      setGuess("");
      setError(null);
    } catch (error) {
      setError("Failed to load a character");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isloading || !guess.trim()) return;

    try {
      setLoading(true);
      const res = await verifyAnswer(character.id, guess);

      setQuestion((q) => q + 1);

      if (res.data.correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
        await loadRandomCharacter();
      } else {
        navigate("/result", {
          state: {
            score,
            streak,
            total: questionCount + 1,
          },
        });
      }
    } catch {
      setError("Error verifying answer");
    } finally {
      setLoading(false);
    }
  };

  if (isloading && !character) {
    return <div className="text-center mt-10">Loading....</div>;
  }

  return (
    <div>
      <h1>Anime Quiz</h1>
      <div>
        <span>Score : {score}</span>
        <span>Streak : {streak}</span>
      </div>
      // If charcter exists then show it
      {character && (
        <img
          key={character.id} // 🔥 THIS IS THE FIX
          src={`http://localhost:5000${character.image_url}`}
          alt="anime character"
          className="w-64 h-64 object-cover rounded"
        />
      )}
      <form onSubmit={handleSubmit} className="">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter Character Name"
          className=""
        />

        <button type="submit" className="">
          Submit
        </button>

        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
};
export default Quiz;
