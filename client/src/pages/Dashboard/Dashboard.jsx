import "./Dashboard.scss";

import Axios from "axios";
import { useEffect, useState } from "react";

import Menu from "../../components/Menu/Menu.jsx";

function Dashboard() {
  // Estado para el resumen de ingresos, egresos y balance
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0
  });

  // Efecto para obtener el resumen de transacciones al cargar la página
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      // Obtiene el usuario por username
      Axios.post("http://localhost:3001/get-user", { username })
        .then(res => {
          if (res.data.id) {
            // Obtiene el resumen de transacciones usando el user_id
            Axios.post("http://localhost:3001/transactions-summary", { user_id: res.data.id })
              .then(res2 => {
                setSummary(res2.data);
              });
          }
        });
    }
  }, []);

  return (
    <div className="dashboard-container">

      <Menu />

      <main className="dashboard-main">

        <h1>Dashboard</h1>

        <div className="dashboard-grid">

          <div className="dashboard-card balance">
            <h3>Available Balance</h3>
            <p>${summary.balance.toLocaleString("es-CO")}</p>
          </div>

          <div className="dashboard-card income">
            <h3>Total Income</h3>
            <p>${summary.total_income.toLocaleString("es-CO")}</p>
          </div>

          <div className="dashboard-card expenses">
            <h3>Total Expenses</h3>
            <p>${summary.total_expense.toLocaleString("es-CO")}</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
