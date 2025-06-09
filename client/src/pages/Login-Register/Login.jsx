import "./Auth.scss";

import Axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Efecto para ocultar el mensaje de error después de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const login = (e) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Si algún campo está vacío, muestra mensaje de error
    if (!email || !password) {
      setErrorMsg("Please enter all fields");
      setError(true);
      return;
    }
    setError(false);
    setErrorMsg("");

    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      // Si el login es exitoso, navega al dashboard
      if (response.data.login) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        // Si el login falla, muestra mensaje de error
        setErrorMsg("login or password is invalid");
        setError(true);
      }
    }).catch(() => {
      // Si ocurre un error en la petición, muestra mensaje de error
      setErrorMsg("Connection error. Please try again later.");
      setError(true);
    });
  };

  // Renderiza el mensaje de error si existe un error
  const message = error ? (
    <span style={{ color: "#f23f43", marginLeft: 8 }}>
      {errorMsg}
    </span>
  ) : null;

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Welcome back!</h1>

        <form className="auth-form" onSubmit={login}>

          <div className="form-group">
            <label htmlFor="email">
              <span>Email</span>{message}
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span>Password</span>{message}
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value)
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
