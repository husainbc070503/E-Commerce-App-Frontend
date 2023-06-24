import {
  Badge,
  Box,
  Grid,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalProductContext } from "../../Contexts/ProductContext";
import "./SingleProduct.css";
import { useGlobalUserContext } from "../../Contexts/UserContext";
import { URL } from "../../Utils/API";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

const ReviewText = styled(Typography)`
  font-size: 20px;
  line-height: 2rem;

  @media (max-width: 890px) {
    text-align: justify;
  }
`;

const ReviewList = () => {
  const { reviews, dispatch } = useGlobalProductContext();
  const { user } = useGlobalUserContext();

  const handleDelete = async (id) => {
    const res = await fetch(`${URL}/api/review/deleteReview/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Review Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: "DELETE_REVIEW", payload: id });
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Box>
      <div className="rev-list-container">
        {reviews.length === 0 ? (
          <Typography>No Reviews. Be the first to add</Typography>
        ) : (
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="TableCell header" width={300}>
                    User
                  </TableCell>
                  <TableCell className="TableCell header" width={500}>
                    Review
                  </TableCell>
                  <TableCell className="TableCell header">Rating</TableCell>
                  <TableCell className="TableCell header">
                    Recommended
                  </TableCell>
                  <TableCell className="TableCell header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews &&
                  reviews.map((rev) => {
                    const {
                      review,
                      rating,
                      isRecommended,
                      _id,
                      user: { avatar, name },
                    } = rev;

                    return (
                      <TableRow
                        key={_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <Grid container spacing={2} alignItems="center">
                            <Grid item md="2">
                              <img
                                src={avatar}
                                alt={name}
                                className="rev-img"
                              />
                            </Grid>
                            <Grid item md="8" textAlign="start">
                              <Typography className="Typography name">
                                {name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="center">
                          <ReviewText
                          >
                            {review}
                          </ReviewText>
                        </TableCell>
                        <TableCell align="center">
                          <Rating
                            name="read-only"
                            value={rating}
                            precision={0.5}
                            readOnly
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Badge
                            badgeContent={isRecommended ? "Yes" : "No"}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {user.name === name ? (
                            <DeleteIcon
                              color="error"
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleDelete(_id)}
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Box>
  );
};

export default ReviewList;
