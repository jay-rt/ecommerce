import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
