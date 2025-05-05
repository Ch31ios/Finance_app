import "./App.scss";

import NotFound from "./components/NotFound/NotFound.jsx";

import Login from "./pages/Login-Register/Login.jsx";
import Register from "./pages/Login-Register/Register.jsx";

import Analysis from "./pages/Analysis/Analysis.jsx";
import CategoryManager from "./pages/CategoryManager/CategoryManager.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

import TransactionForm from "./pages/TransactionForm/TransactionForm.jsx";
import TransactionList from "./pages/TransactionList/TransactionList.jsx";

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Initial route */}
        <Route path="/login" element={<Login />} />

        {/* Main routes */}
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/category-manager" element={<CategoryManager />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />

        {/* Transaction routes */}
        <Route path="/transaction-form" element={<TransactionForm />} />
        <Route path="/transaction-list" element={<TransactionList />} />

        {/* Route for not found pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
