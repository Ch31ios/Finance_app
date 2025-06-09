import "./Menu.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu() {

  const [username, setUsername] = useState("");

  // Obtiene el username almacenado en localStorage al montar el componente
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <aside>
      <h2>{username}</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/categories">Category Manager</Link></li>
          <li><Link to="/transactions">New Transaction</Link></li>
          <li><Link to="/transaction-list">Transaction List</Link></li>
          <li><Link to="/analysis">Analysis</Link></li>
        </ul>
      </nav>
      <button
        className="logout-button"
        onClick={() => {
          // Elimina el estado de autenticación
          localStorage.removeItem("isAuthenticated");
          // Limpia el username al salir
          localStorage.removeItem("username");
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
    </aside>
  );
}

export default Menu;
