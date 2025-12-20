import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Quiz from "./pages/Quiz.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Result from "./pages/Result.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route
          path="/Leaderboard"
          element={
            <ProtectedRoute>
              {" "}
              <Leaderboard />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
