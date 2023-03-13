import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import useApiCalls from "../../hooks/useApiCalls";
import "./edit.scss";
import app from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { allProducts } from "../../redux/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const products = useSelector(allProducts);
  const product = products.length !== 0 && products.find((p) => p._id === id);
  const [file, setFile] = useState("");
  const [input, setInput] = useState(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateProduct = useApiCalls("updateProduct");

  const uploadToFirebase = () => {
    const filename = new Date().getTime() + "_" + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updateProduct(dispatch, { ...input, img: downloadURL }, id);
      }
    );
  };

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
    file ? uploadToFirebase() : updateProduct(dispatch, input, id);
    setFile("");
    setInput({});
    navigate(`/products/${id}`);
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
