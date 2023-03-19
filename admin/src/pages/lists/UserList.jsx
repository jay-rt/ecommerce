import DataTable from "../../components/tables/datatable/DataTable";
import useValues from "../../hooks/useValues";

const userColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "fullname",
    headerName: "Full Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cell-with-img">
          <img
            className="cell-img"
            src={
              params.row.img ||
              "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            }
            alt="avatar"
          />
          {params.row.firstname + " " + params.row.lastname}
        </div>
      );
    },
  },
  { field: "username", headerName: "Username", width: 100 },
  { field: "email", headerName: "Email", width: 230 },
];

const UserList = () => {
  const users = useValues("/users", "Users");
  return <DataTable rows={users} columns={userColumns} title="User" />;
};

export default UserList;
