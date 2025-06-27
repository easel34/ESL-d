import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const drawerWidth = isSidebar ? 240 : 70;

  return (
    <div>
      {/* Sidebar */}
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />

      {/* Main Content */}
      <div
        style={{
          marginLeft: drawerWidth,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Topbar setIsSidebar={setIsSidebar} />
        <main style={{ padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
