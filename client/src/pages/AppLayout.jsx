import { Outlet } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const AppLayout = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
};

export default AppLayout;
