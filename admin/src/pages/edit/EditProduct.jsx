import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiCalls from "../../hooks/useApiCalls";
import "./edit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { allProducts } from "../../redux/productSlice";
import useFirebase from "../../hooks/useFirebase";

const EditProduct = () => {
  const { id } = useParams();
  const products = useSelector(allProducts);
  const product = products.length !== 0 && products.find((p) => p._id === id);
  const [file, setFile] = useState("");
  const [input, setInput] = useState(product);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateProduct = useApiCalls("updateProduct");
  const url = useFirebase(file, submit);

  useEffect(() => {
    const noImgUpdate = () => {
      updateProduct(dispatch, input, id);
      navigate(`/products/${id}`);
    };

    const imgUpdate = () => {
      updateProduct(dispatch, { ...input, img: url }, id);
      navigate(`/products/${id}`);
    };
    const editProduct = () => {
      console.log("Product updated");
      file ? url && imgUpdate() : noImgUpdate();
      file ? console.log(url) : console.log("No url");
    };
    submit && editProduct();
  }, [submit, file, url]);

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
    <div className="edit">
      <div className="top">
        <h1 className="title">Update Product</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={file ? URL.createObjectURL(file) : input.img}
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
              <select
                name="inStock"
                id="stock"
                onChange={handleChange}
                defaultValue={input.inStock}
              >
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

export default EditProduct;
