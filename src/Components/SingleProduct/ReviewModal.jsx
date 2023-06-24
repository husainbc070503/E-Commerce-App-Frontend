import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { URL } from "../../Utils/API";
import { useGlobalUserContext } from "../../Contexts/UserContext";
import { useParams } from "react-router-dom";
import { useGlobalProductContext } from "../../Contexts/ProductContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxWidth: "90%",
  bgcolor: "#F9F5F6",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  review: "",
  rating: 1,
  isRecommended: true,
};

const ReviewModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRev, setUserRev] = useState(initialState);
  const { user } = useGlobalUserContext();
  const { dispatch } = useGlobalProductContext();
  const { id } = useParams();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${URL}/api/review/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...userRev, pro: id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpen(false);
        setUserRev(initialState);
        dispatch({ type: "ADD_REVIEW", payload: data.rev });
      }
    } catch (error) {
      toast.error(error.message, {
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
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Yours
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                multiline
                rows={3}
                name="review"
                label="Review/Feedback"
                value={userRev.review}
                onChange={(e) =>
                  setUserRev({ ...userRev, review: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div className="input-group">
            <Grid container spacing={2} alignItems="center">
              <Grid item md={4}>
                <Typography>Rating</Typography>
              </Grid>
              <Grid item md={8} sx={{ marginTop: "8px" }}>
                <Rating
                  name="rating"
                  value={userRev.rating}
                  precision={0.5}
                  onChange={(e, newValue) =>
                    setUserRev({ ...userRev, rating: newValue })
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-group">
            <Grid container spacing={2} alignItems="center">
              <Grid item md={4}>
                <Typography>Recommeding?</Typography>
              </Grid>
              <Grid item md={8}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={userRev.isRecommended}
                    onChange={(e) =>
                      setUserRev({ ...userRev, isRecommended: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "8px" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;
