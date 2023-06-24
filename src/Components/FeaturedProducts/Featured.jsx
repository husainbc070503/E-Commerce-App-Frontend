import React from "react";
import { useGlobalProductContext } from "../../Contexts/ProductContext";
import { Box, Grid, Typography } from "@mui/material";
import Product from "./Product";

const Featured = () => {
  const { featuredProducts, isLoading } = useGlobalProductContext();

  return (
    <section className="odd-section">
      <div className="ecom-container odd-container">
        <Box>
          <div className="heading">
            <span>Check Now!</span>
            <h1>Featured Products</h1>
          </div>
          <div className="products">
            <Grid container spacing={4}>
              {featuredProducts &&
                featuredProducts.map((i) => {
                  return (
                    <Grid key={i._id} item md={4}>
                      <Product pro={i} />
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default Featured;
