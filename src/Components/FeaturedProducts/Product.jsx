import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import "./Featured.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import { useGlobalProductContext } from "../../Contexts/ProductContext";

const Name = styled(Typography)`
  color: #537188;
  font-weight: bold;
  font-size: 20px;
  text-transform: capitalize;
`;

const Price = styled(Typography)`
  color: #212a3eab;
  font-weight: bold;
  font-size: 15px;
  text-align: justify;
`;

const Product = ({ pro }) => {
  const { _id, name, image, price, category } = pro;
  const { allProReviews } = useGlobalProductContext();

  const ratedProds = allProReviews.filter((rev) => rev.product === _id);
  const ratings = ratedProds.map((rev) => rev.rating);

  const sumRatings = ratings.reduce((prev, curr) => prev + curr, 0);
  const avgRating = sumRatings / ratings.length;

  return (
    <Link
      to={
        localStorage.getItem("e-comm-user")
          ? `/singleProduct/${_id}`
          : "../login"
      }
      style={{ textDecoration: "none" }}
    >
      <Box>
        <div className="pro-card">
          <div className="pro-image">
            <img src={image} alt={price} />
          </div>
          <div className="pro-description">
            <Name component="h1">{name}</Name>
            <Price>
              <i
                className="fa-solid fa-indian-rupee-sign"
                style={{ marginRight: "2px" }}
              ></i>
              {price}
            </Price>
          </div>
          <div className="pro-rating">
            <Rating
              readOnly
              value={avgRating}
              precision={0.5}
              sx={{
                fontSize: "16px",
                "& .MuiRating-iconFilled": {
                  color: "yellow",
                },
              }}
            />
          </div>
          <div className="category">
            <span>{category.name}</span>
          </div>
        </div>
      </Box>
    </Link>
  );
};

export default Product;
