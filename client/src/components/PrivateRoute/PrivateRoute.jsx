import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Verifica si el usuario está autenticado consultando el localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  // Si está autenticado, muestra el contenido; si no, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;