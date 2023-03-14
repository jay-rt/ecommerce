import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiCalls from "../../hooks/useApiCalls";
import "./new.scss";

const NewUser = () => {
  const [file, setFile] = useState("");
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="new">
      <div className="top">
        <h1 className="title">Add New User</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
            className="image"
          />
        </div>
        <div className="right">
          <form>
            <div className="form-input">
              <label htmlFor="file" className="label-img">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                className="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="form-input">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={input.firstname}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={input.lastname}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={input.username}
                placeholder="User Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                placeholder="something@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={input.password}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="admin">Admin</label>
              <select name="inAdmin" id="admin" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
