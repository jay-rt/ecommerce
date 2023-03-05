import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";
import "./basictable.scss";

const Basictable = ({ orders }) => {
  return (
    <TableContainer component={Paper} className="basic-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table-cell">Order ID</TableCell>
            <TableCell className="table-cell">Product</TableCell>
            <TableCell className="table-cell">Customer</TableCell>
            <TableCell className="table-cell">Date</TableCell>
            <TableCell className="table-cell">Amount</TableCell>
            <TableCell className="table-cell">Address</TableCell>
            <TableCell className="table-cell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="table-cell">{order._id}</TableCell>
              <TableCell className="table-cell">
                <div className="cell-wrapper">
                  {order.products.map((product) => (
                    <div
                      className="product-wrapper"
                      key={product.productId + product.size + product.color}
                    >
                      <img src={product.productImg} alt="" className="image" />
                      {product.productName}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="table-cell">{order.fullname}</TableCell>
              <TableCell className="table-cell">
                {format(order.createdAt)}
              </TableCell>
              <TableCell className="table-cell">{order.amount}</TableCell>
              <TableCell className="table-cell">{`${order.address.line1}, ${order.address.city}, ${order.address.state}, ${order.address.postal_code}`}</TableCell>
              <TableCell className="table-cell">
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Basictable;
