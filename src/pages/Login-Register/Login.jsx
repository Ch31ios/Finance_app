import "./Auth.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@gmail.com" && password === "123") {
      navigate("/dashboard");
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Welcome back!</h1>

        <form className="auth-form" onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="Enter your email"
              style={{
                border: "1px solid",
                borderColor: error ? "#f04747" : "transparent"
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter your password"
              style={{
                border: "1px solid",
                borderColor: error ? "#f04747" : "transparent"
              }}
            />
          </div>

          <a className="forgot-password">Forgot your password?</a>

          <button type="submit" className="auth-button">Login</button>

        </form>

        <div className="auth-footer">
          <p>Need an account? <Link to="/register">Register</Link></p>
        </div>

      </div>
    </div>
  );
}

export default Login;
