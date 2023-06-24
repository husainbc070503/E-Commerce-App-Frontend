import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Product from "../FeaturedProducts/Product";

const MoreProducts = ({ moreProducts }) => {
  return (
    <Box>
      <h1 className="more-header">More Like This</h1>
      {moreProducts !== "undefined" ? (
        <Grid container spacing={4}>
          {moreProducts.map((i) => {
            return (
              <Grid item key={i._id} md={4}>
                <Product pro={i} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>No products</Typography>
      )}
    </Box>
  );
};

export default MoreProducts;
