import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useApiCalls from "../../hooks/useApiCalls";
import "./new.scss";
import useFirebase from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

const initialInput = {
  name: "",
  description: "",
  categories: [],
  size: [],
  color: [],
  price: 0,
  inStock: true,
};

const NewProduct = () => {
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [input, setInput] = useState(initialInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addProduct = useApiCalls("addProduct");
  const url = useFirebase(file, submit);

  useEffect(() => {
    const createProduct = () => {
      addProduct(dispatch, { ...input, img: url });
      console.log(url);
      navigate("/products");
    };
    submit && url && createProduct();
  }, [submit, url, addProduct, dispatch, input, navigate]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleArray = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.split(","),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <div className="new">
      <div className="top">
        <h1 className="title">{"Add New Product"}</h1>
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                name="description"
                value={input.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="cat">Categories</label>
              <input
                type="text"
                id="cat"
                name="categories"
                value={input.categories}
                placeholder="men, summer"
                onChange={handleArray}
              />
            </div>
            <div className="form-input">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                name="size"
                id="size"
                value={input.size}
                placeholder="s, m"
                onChange={handleArray}
              />
            </div>
            <div className="form-input">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                name="color"
                id="color"
                value={input.color}
                placeholder="red, black"
                onChange={handleArray}
              />
            </div>
            <div className="form-input">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={input.price}
                placeholder="29"
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="stock">Stock</label>
              <select name="inStock" id="stock" onChange={handleChange}>
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

export default NewProduct;
