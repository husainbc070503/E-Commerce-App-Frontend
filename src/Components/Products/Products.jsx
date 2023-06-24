import { Box, Grid } from "@mui/material";
import React from "react";
import Filters from "./Filters";
import "./Products.css";
import SortFilter from "./SortFilter";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import GridView from "./GridView";
import ListView from "./ListView";

const Products = () => {
  const { grid_view } = useGlobalFilterContext();

  return (
    <section className="products-section">
      <div className="ecom-container products-container">
        <Box>
          <Grid container spacing={10}>
            <Grid item md={3} xs={12}>
              <Filters />
            </Grid>
            <Grid item md={9}>
              <div className="sort-filter">
                <SortFilter />
              </div>
              <div className="products-lists">
                {grid_view ? <GridView /> : <ListView />}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
  );
};

export default Products;
