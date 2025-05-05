import "./Menu.scss";

import { Link } from "react-router-dom";

function Menu() {
  return (
      <aside>
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
  );
}

export default Menu;
