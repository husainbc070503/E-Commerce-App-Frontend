import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import { useGlobalUserContext } from "../../Contexts/UserContext";
import Payment from "./Checkout";
import { Link, useNavigate } from "react-router-dom";

const Total = () => {
  const { totalPrice, cart, clearCart } = useGlobalCartContext();
  const { user } = useGlobalUserContext();
  const navigate = useNavigate();

  return (
    <Box>
      <div className="sub-total-container">
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", lineHeight: "3rem" }}
        >
          Total Price: <CurrencyRupeeIcon sx={{ fontSize: "13px" }} />
          {totalPrice}
        </Typography>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", lineHeight: "3rem" }}
        >
          Shipping Fee: <CurrencyRupeeIcon sx={{ fontSize: "13px" }} />
          {0.0}
        </Typography>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", lineHeight: "3rem" }}
        >
          Order Total: <CurrencyRupeeIcon sx={{ fontSize: "13px" }} />
          {totalPrice + 0.0}
        </Typography>
        <Button
          variant="contained"
          className="Button checkout"
          disabled={cart.length === 0}
          onClick={() => {
            Payment(user, cart, totalPrice);
            clearCart();
            navigate("../products");
          }}
        >
          Checkout
        </Button>
      </div>
    </Box>
  );
};

export default Total;
