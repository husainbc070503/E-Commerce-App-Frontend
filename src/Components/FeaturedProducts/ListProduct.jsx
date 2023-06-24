import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";

const ListProduct = ({ pro }) => {
  const { _id, name, image, price, category, description } = pro;

  return (
    <Box>
      <div className="list-pro-card">
        <Grid container spacing={4}>
          <Grid item md={6}>
            <div className="list-image">
              <img src={image} alt={name} />
              <span className="category">
                <span>{category.name}</span>
              </span>
            </div>
          </Grid>
          <Grid item md={6}>
            <h2 style={{ textTransform: "capitalize" }}>{name}</h2>
            <span className="list-price">
              <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
              {price}
            </span>
            <Typography className="Typography desc">
              {description.substr(0, 250) + "..."}
            </Typography>
            <Link to={`/singleProduct/${_id}`} className="readMore">
              Read More
            </Link>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default ListProduct;
