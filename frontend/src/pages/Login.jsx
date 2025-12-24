import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this line t

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.accessToken);
      navigate("/quiz");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-200">
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-amber-300 h-75 w-100 border border-dark-900 flex flex-col   rounded-lg p-5"
      >
        <h1 className="text-3xl mx-auto mb-3">Login</h1>

        <div className="mt-5">
          <input
            className="p-3  w-full bg-white rounded-lg m-1 "
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3  w-full bg-white rounded-lg m-1"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 rounded-lg mx-auto mt-3 w-fit text-white p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
