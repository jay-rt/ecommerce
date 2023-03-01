import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import "./new.scss";

const New = ({ title, inputs }) => {
  const [file, setFile] = useState("");
  return (
    <div className="new">
      <div className="top">
        <h1 className="title">{`Add New ${title}`}</h1>
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
            {inputs.map((input) => (
              <div className="form-input" key={input.id}>
                <label htmlFor="input.id">{input.label}:</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  name={input.id}
                />
              </div>
            ))}

            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
