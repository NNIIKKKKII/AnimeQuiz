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
  const [isloading, setLoading] = useState(null);
  const [guess, setGuess] = useState("");

  useEffect(async () => {
    await loadRandomCharacter();
  });

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
    if (!guess.trim()) return; //this return is used to exit the function when nothing is passed and pressed submit

    try {
      const res = await verifyAnswer(character._id, guess);

      setQuestion((q) => q + 1); //here i increment question count

      if (res.data.correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
        loadRandomCharacter();
      } else {
        navigate("/result", {
          score,
          streak,
          total: questionCount + 1,
        });
      }
    } catch (err) {
      setError("error Verifying Answer");
    }
  };

  if (loading && !currentCharcter) {
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
      {currentCharcter && (
        <img
          src={currentCharcter.image_url}
          alt="anime Character"
          className=""
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
