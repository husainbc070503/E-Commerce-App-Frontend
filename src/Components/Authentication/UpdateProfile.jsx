import {
  Box,
  FormControl,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  FormLabel,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalUserContext } from "../../Contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../Utils/API";
import { useNavigate } from "react-router-dom";

const Heading = styled(Typography)`
  text-align: center;
  font-size: 30px;
  color: #9575de;
  font-weight: bold;
  margin-bottom: 22px;
`;

const Label = styled(FormLabel)`
  color: #0e2954;
  margin-bottom: 6px;
`;

const UpdateProfile = () => {
  const { user } = useGlobalUserContext();
  const [updateUser, setUpdateUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  useEffect(() => setUpdateUser(user), [user]);

  const handleUpload = async (file) => {
    setLoading(true);

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ecommerce_app");
      data.append("cloud", "dztxhls16");

      const res = await axios.post(url, data);
      const result = res.data;

      if (result) {
        toast.success("Image uploaded successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
        setUpdateUser({ ...updateUser, avatar: result.url });
        return;
      } else {
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
        return;
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

      setLoading(false);
      return;
    }
  };

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${URL}/api/user/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updateUser),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.removeItem("e-comm-user");
        navigate("../login");
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
    <ThemeProvider theme={theme}>
      <div className="ecom-container up-container">
        <Box>
          <Heading>Update Profile</Heading>
          <div className="header">
            <Grid container spacing={4} alignItems="center">
              <Grid item md={4} xs={12}>
                <div className="up-image">
                  <img src={updateUser.avatar} />
                  <label htmlFor="update-pic" className="up-label">
                    <EditIcon sx={{ color: "#9575DE" }} />
                  </label>
                  <input
                    type="file"
                    id="update-pic"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </div>
              </Grid>
              <Grid item md={8} xs={12}>
                <FormControl fullWidth>
                  <Label>Name</Label>
                  <TextField
                    type="text"
                    name="name"
                    value={updateUser.name}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div className="input-group">
              <FormControl fullWidth>
                <Label>Email</Label>
                <TextField
                  type="email"
                  name="email"
                  value={updateUser.email}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <Label>Phone No.</Label>
                <TextField
                  type="tel"
                  name="phone"
                  value={updateUser.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div className="input-group">
              <FormControl fullWidth>
                <Label>Address</Label>
                <TextField
                  type="text"
                  multiline
                  rows={5}
                  name="address"
                  value={updateUser.address}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default UpdateProfile;
