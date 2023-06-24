import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import CartTable from "./CartTable";
import "./Cart.css";
import Total from "./Total";
import { Link } from "react-router-dom";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import { useGlobalUserContext } from "../../Contexts/UserContext";

const Cart = () => {
  const { clearCart } = useGlobalCartContext();
  const { user } = useGlobalUserContext();

  return (
    <Box>
      <div className="cart-container ecom-container">
        <Typography className="Typography header">
          {user.name} Cart Items
        </Typography>
        <div className="cart-table">
          <CartTable />
        </div>
        <Grid container sx={{ margin: "30px 0" }}>
          <Grid item md={6}>
            <Link to="../products" className="continue">
              Continue Shopping
            </Link>
          </Grid>
          <Grid item md={6} xs={12}>
            <Button
              variant="contained"
              className="Button clear"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Grid>
        </Grid>
        <Total />
      </div>
    </Box>
  );
};

export default Cart;
