import { useState } from "react";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <form method="post" className="login-form">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-login" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
