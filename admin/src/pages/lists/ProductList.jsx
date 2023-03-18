import DataTable from "../../components/tables/datatable/DataTable";
import { useSelector, useDispatch } from "react-redux";
import { allProducts } from "../../redux/productSlice";
import { useEffect } from "react";
import { getProducts } from "../../redux/apiCalls";

const productColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cell-with-img">
          <img
            className="cell-img"
            src={params.row.img}
            alt={params.row.name}
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "color",
    headerName: "Colour",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cell-with-color">
          {params.row.color.map((c) => (
            <span
              className="color"
              style={{ backgroundColor: c }}
              key={c}
            ></span>
          ))}
        </div>
      );
    },
  },
  { field: "inStock", headerName: "Stock", width: 120 },
  { field: "price", headerName: "Price", width: 120 },
];

const ProductList = () => {
  const products = useSelector(allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    products.length === 0 && getProducts(dispatch);
  }, [dispatch, products.length]);

  return <DataTable rows={products} columns={productColumns} title="Product" />;
};

export default ProductList;
