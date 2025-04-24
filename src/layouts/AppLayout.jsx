
import Login from "../pages/Login/login";

import { Outlet, useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app">
      {isHomePage ? (
        <main>
          <Login />
        </main>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default AppLayout;
