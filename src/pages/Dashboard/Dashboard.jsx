import "./Dashboard.scss";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <aside className="dashboard-menu">
        <h2>Finance App</h2>
        <nav>
          <ul>
            <li><Link to="/category-manager">Category Manager</Link></li>
            <li><Link to="/transaction-form">New Transaction</Link></li>
            <li><Link to="/transaction-list">Transaction List</Link></li>
            <li><Link to="/analysis">Analysis</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={() => window.location.href = "/login"}>Log Out</button>
      </aside>

      <main className="dashboard-main">
        <h1>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card balance">
            <h3>Available Balance</h3>
            <p>$10,000</p>
          </div>
          <div className="dashboard-card income">
            <h3>Total Income</h3>
            <p>$25,000</p>
          </div>
          <div className="dashboard-card expenses">
            <h3>Total Expenses</h3>
            <p>$15,000</p>
          </div>
        </div>

      </main>

    </div>
  );
}

export default Dashboard;
