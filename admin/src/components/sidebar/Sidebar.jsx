import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PollIcon from "@mui/icons-material/Poll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <p className="title">MAIN</p>
        <li>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </li>
        <p className="title">LISTS</p>
        <Link to="/users" className="link">
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/products" className="link">
          <li>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
        </Link>
        <li>
          <CreditCardIcon className="icon" />
          <span>Orders</span>
        </li>
        <li>
          <LocalShippingIcon className="icon" />
          <span>Delivery</span>
        </li>
        <p className="title">USEFUL</p>
        <li>
          <PollIcon className="icon" />
          <span>Stats</span>
        </li>
        <li>
          <NotificationsNoneIcon className="icon" />
          <span>Notifications</span>
        </li>
        <p className="title">SERVICE</p>
        <li>
          <SettingsSystemDaydreamOutlinedIcon className="icon" />
          <span>System Health</span>
        </li>
        <li>
          <PsychologyOutlinedIcon className="icon" />
          <span>Logs</span>
        </li>
        <li>
          <SettingsIcon className="icon" />
          <span>Settings</span>
        </li>
        <p className="title">USER</p>
        <li>
          <AccountCircleOutlinedIcon className="icon" />
          <span>Profile</span>
        </li>
        <li>
          <ExitToAppIcon className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
