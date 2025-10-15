import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/LoginPage.css";
import toerahLogo from "../assets/ToerahLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("Incorrect email or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={toerahLogo} alt="Toerah Logo" className="login-logo" />
        <h1>LOG IN</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};
export default LoginPage;
