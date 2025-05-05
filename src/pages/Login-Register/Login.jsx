import "./Auth.scss";

import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Welcome back!</h1>

        <form className="auth-form">

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
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
