import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Rating, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useGlobalProductContext } from "../../Contexts/ProductContext";

const ReviewsText = styled(Typography)`
  display: inline-block;
  margin: 0 10px 0;
  color: #9babb8;
`;

const Reviews = () => {
  const { reviews } = useGlobalProductContext();

  const sumRating = reviews.reduce((acc, item) => acc + item.rating, 0);
  const avgRating = sumRating / reviews.length;

  return (
    <Box>
      <Rating value={avgRating} precision={0.5} readOnly />
      <ReviewsText>
        ({reviews.length} {reviews.length === 1 ? "Review" : "Reviews"})
      </ReviewsText>
    </Box>
  );
};

export default Reviews;
