import "./Auth.scss";

import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Create an account</h1>

        <form className="auth-form">

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="auth-button">Continue</button>

        </form>

        <div className="auth-footer">
          <Link to="/login">Already have an account?</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
