import { Box, Grid, Tab, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const RemoveIconStyled = styled(RemoveIcon)`
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 890px) {
    font-size: 16px;
  }
`;

const AddIconStyled = styled(AddIcon)`
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 890px) {
    font-size: 16px;
  }
`;

const Row = ({ pro }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useGlobalCartContext();

  const { image, name, quantity, price, _id, userQuantity } = pro;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell sx={{ width: "150px" }}>
        <img src={image ? image : ""} alt={name} className="pro-image" />
      </TableCell>
      <TableCell>
        <Typography className="Typography cellText">{name}</Typography>
      </TableCell>
      <TableCell>
        <Typography className="Typography cellText">
          <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
          {price}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className="Typography cellText">
          <RemoveIconStyled onClick={() => decrementQuantity(_id)} />
          <p className="quantity">{userQuantity}</p>
          <AddIconStyled onClick={() => incrementQuantity(_id, quantity)} />
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className="Typography cellText">
          <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
          {price * userQuantity}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className="Typography cellText">
          <DeleteIcon
            sx={{ color: "orangered", fontSize: "24px", cursor: "pointer" }}
            onClick={() => removeFromCart(_id)}
          />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Row;
