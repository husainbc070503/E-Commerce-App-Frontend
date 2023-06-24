import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalProductContext } from "../../Contexts/ProductContext";
import { Grid, Box, Typography, Button } from "@mui/material";
import { URL } from "../../Utils/API";
import "./SingleProduct.css";
import styled from "@emotion/styled";
import Reviews from "./Reviews";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreProducts from "./MoreProducts";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import { useGlobalCartContext } from "../../Contexts/CartContext";
import ProReview from "./ProReview";

const Name = styled(Typography)`
  font-size: 32px;
  line-height: 2rem;
  color: #2c3333;
  text-transform: capitalize;
`;

const SingleProduct = () => {
  const { id } = useParams();
  const { getSingleProduct, singleProduct, getReviews } =
    useGlobalProductContext();
  const { allProducts } = useGlobalFilterContext();
  const { addToCart, cart } = useGlobalCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct(`${URL}/api/product/getProduct/${id}`);
    getReviews(`${URL}/api/review/getReviews/${id}`);
  }, [id]);

  const { image, name, description, price, company, category } = singleProduct;

  const moreProducts = allProducts.filter(
    (item) => item.category?.name === category?.name && item._id !== id
  );

  return (
    <Box>
      <div className="ecom-container single-pro-container">
        <Grid container spacing={6}>
          <Grid item md={6}>
            <div className="product-image">
              <img src={image ? image : ""} alt={name} />
            </div>
          </Grid>
          <Grid item md={6}>
            <Name>{name}</Name>
            <div className="reviews">
              <Reviews />
            </div>
            <div className="mrp">
              <Typography className="Typography rupees">
                MRP <CurrencyRupeeIcon sx={{ fontSize: "12px" }} />
                {price}
              </Typography>
            </div>
            <div className="desc">
              <Typography className="Typography description">
                {description}
              </Typography>
            </div>
            <div className="avalaibility">
              <Typography className="Typography features">
                Avalaible:
                <span>
                  {company?.isProductsAvalaible > 0
                    ? "In Stock"
                    : "Not available"}
                </span>
              </Typography>
              <Typography className="Typography features">
                Brand: <span>{company?.name}</span>
              </Typography>
            </div>

            {company?.isProductsAvalaible > 0 && (
              <Button
                variant="contained"
                className="Button add"
                onClick={() => {
                  localStorage.getItem("e-comm-user")
                    ? addToCart(singleProduct)
                    : navigate("../login");
                }}
                disabled={cart.find((item) => item._id === id)}
              >
                Add to cart
              </Button>
            )}
          </Grid>
        </Grid>

        <MoreProducts moreProducts={moreProducts} />
        <ProReview pro={id} />
      </div>
    </Box>
  );
};

export default SingleProduct;
