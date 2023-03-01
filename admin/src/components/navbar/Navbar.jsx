import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, toggleTheme } from "../../redux/themeSlice";

const Navbar = () => {
  const darkMode = useSelector(dark);
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="link">
          <span className="logo">jayadmin</span>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="right">
        <div className="item">
          <LanguageOutlinedIcon className="icon" />
          English
        </div>
        <div className="item" onClick={handleTheme}>
          {darkMode ? (
            <LightModeOutlinedIcon className="icon" />
          ) : (
            <DarkModeOutlinedIcon className="icon" />
          )}
        </div>
        <div className="item">
          <FullscreenExitOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <div className="counter">2</div>
        </div>
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/825fb915-d6a8-4bd2-ba12-ba661266a6f9/dfndzhb-a8b9f8a0-911f-496a-8761-74d9bfddd42d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgyNWZiOTE1LWQ2YTgtNGJkMi1iYTEyLWJhNjYxMjY2YTZmOVwvZGZuZHpoYi1hOGI5ZjhhMC05MTFmLTQ5NmEtODc2MS03NGQ5YmZkZGQ0MmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dRhgXSgvz4ABec5LSl7JHG2P6018k2oJdI5dNYKAH9Q"
            alt=""
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
