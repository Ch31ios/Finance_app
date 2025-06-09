import "./Auth.scss";

import Axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Efecto para ocultar el mensaje de error después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(false);
        setErrorMsg("");
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Constante para limpiar los campos del formulario
  const clearInputs = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const register = (e) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Si algún campo está vacío, muestra mensaje de error
    if (!email || !username || !password) {
      setErrorMsg("Please enter all fields");
      setError(true);
      return;
    }
    setError(false);
    setErrorMsg("");

    Axios.post("http://localhost:3001/register", {
      email,
      username,
      password,
    })
      .then((response) => {
        // Si el registro es exitoso, muestra mensaje de éxito y limpia los campos
        if (response.data.success) {
          setSuccess(true);
          setError(false);
          setErrorMsg("");
          clearInputs();
        } else if (response.data.error) {
          // Si ocurre un error, muestra el mensaje del backend
          setError(true);
          setErrorMsg(response.data.error);
          setSuccess(false);
        }
      })
      .catch(() => {
        setError(true);
        // Si ocurre un error en la petición, muestra mensaje de error
        setErrorMsg("Connection error. Please try again later.");
        setSuccess(false);
      });
  };

  // Renderiza el mensaje de error o éxito si existe
  const message = error ? (
    <span style={{ color: "#f23f43" }}>{errorMsg}</span>
  ) : success ? (
    <span style={{ color: "#2ecc40" }}>
      User registered successfully
    </span>
  ) : null;

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Create an account</h1>

        <form className="auth-form" onSubmit={register}>

          <div className="form-group">
            <label htmlFor="email">
              <span>Email</span>{message}
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">
              <span>Username</span>{message}
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span>Password</span>{message}
            </label>
            <input
              type="text"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
