import { Grid } from "@mui/material";
import React from "react";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import Product from "../FeaturedProducts/Product";

const GridView = () => {
  const { filteredProducts } = useGlobalFilterContext();

  return (
    <div className="product-list-container">
      <Grid container spacing={4}>
        {filteredProducts &&
          filteredProducts.map((i) => {
            return (
              <Grid key={i._id} item md={4}>
                <Product pro={i} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default GridView;
