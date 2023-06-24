import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import Row from "./Row";
import "./Cart.css";

const CartTable = () => {
  const { cart } = useGlobalCartContext();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="TableCell header">Product</TableCell>
            <TableCell className="TableCell header">Name</TableCell>
            <TableCell className="TableCell header">Price</TableCell>
            <TableCell className="TableCell header">Quantity</TableCell>
            <TableCell className="TableCell header">Subtotal</TableCell>
            <TableCell className="TableCell header">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart &&
            cart.map((pro) => {
              return <Row pro={pro} key={pro._id} />;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
