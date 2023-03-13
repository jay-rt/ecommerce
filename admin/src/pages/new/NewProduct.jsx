import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiCalls from "../../hooks/useApiCalls";
import "./new.scss";

const initialProduct = {
  name: "",
  description: "",
  img: "",
  categories: [],
  size: [],
  color: [],
  price: 0,
  inStock: false,
};

const NewProduct = () => {
  const [file, setFile] = useState("");
  const [product, setProduct] = useState(initialProduct);
  const dispatch = useDispatch();
  const addProduct = useApiCalls("addProduct");

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleArray = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.split(","),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(dispatch, product);
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
            {/* {inputs.map((input) => (
              <div className="form-input" key={input.id}>
                <label htmlFor={input.id}>{input.label}:</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  name={input.id}
                />
              </div>
            ))} */}

            <div className="form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
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
                value={product.description}
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
                value={product.categories}
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
                value={product.size}
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
                value={product.color}
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
                value={product.price}
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
