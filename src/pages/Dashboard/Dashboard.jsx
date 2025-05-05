import "./Dashboard.scss";

import Menu from "../../components/Menu/Menu.jsx";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <Menu />

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
