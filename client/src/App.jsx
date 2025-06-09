import "./App.scss";

import NotFound from "./components/NotFound/NotFound.jsx";

import Login from "./pages/Login-Register/Login.jsx";
import Register from "./pages/Login-Register/Register.jsx";

import Analysis from "./pages/Analysis/Analysis.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Categories from "./pages/Transactions-Categories/Categories.jsx";

import TransactionList from "./pages/TransactionList/TransactionList.jsx";
import Transactions from "./pages/Transactions-Categories/Transactions.jsx";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas, solo accesibles si el usuario está autenticado */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <PrivateRoute>
              <Analysis />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction-list"
          element={
            <PrivateRoute>
              <TransactionList />
            </PrivateRoute>
          }
        />

        {/* Ruta para páginas no encontradas (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
