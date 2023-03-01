import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./datatable.scss";

const DataTable = ({ rows, columns, title }) => {
  const [data, setData] = useState(rows);
  const location = useLocation();
  const link = location.pathname;

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <Link to={`${link}/${params.row.id}`} className="link">
              <div className="btn btn-view">View</div>
            </Link>
            <div
              className="btn btn-delete"
              onClick={() => handleDelete(params.row.id)}
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
        rows={data}
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
