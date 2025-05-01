import "./App.scss";

import NotFound from "./components/NotFound/NotFound.jsx";

import Login from "./pages/Login/login.jsx";

import Analysis from "./pages/Analysis/Analysis.jsx";
import CategoryManager from "./pages/CategoryManager/CategoryManager.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

import Register from "./pages/Register/Register.jsx";

import TransactionForm from "./pages/TransactionForm/TransactionForm.jsx";
import TransactionList from "./pages/TransactionList/TransactionList.jsx";

import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial route */}
        <Route index element={<Login />} />

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
