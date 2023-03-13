import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useApiCalls from "../../../hooks/useApiCalls";
import "./datatable.scss";

const DataTable = ({ rows, columns, title }) => {
  const location = useLocation();
  const link = location.pathname;
  const dispatch = useDispatch();
  const deleteProduct = useApiCalls("deleteProduct");

  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <Link to={`${link}/${params.row._id}`} className="link">
              <div className="btn btn-view">View</div>
            </Link>
            <div
              className="btn btn-delete"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatable-title">
        <h1>{`Add New ${title}`}</h1>
        <Link to={`${link}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
