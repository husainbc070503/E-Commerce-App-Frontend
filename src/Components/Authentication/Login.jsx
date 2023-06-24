import {
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.png";
import styled from "@emotion/styled";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalUserContext } from "../../Contexts/UserContext";
import ForgotModal from "./ForgotModal";
import { indigo } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";

const Input = styled(TextField)`
  width: 100%;
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  address: "",
  phone: "",
  image: "",
};

const Login = () => {
  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  const [show, setShow] = useState(false);
  const [page, setPage] = useState("login");
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { register, login } = useGlobalUserContext();
  const navigate = useNavigate();

  /* Upload Profile Image */
  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
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
        setDetails({ ...details, image: result.url });
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
      toast.error(`${error.message}`, {
        position: "top-center",
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
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (page !== "login") {
      if (details.password !== details.repeatPassword) {
        toast.error(`Mismatch Password`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      const data = await register(details);
      if (data.success) {
        toast.success(`Registration Successful.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setPage("login");
        setDetails(initialState);
      } else {
        toast.error(`${data.message}`, {
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
    } else {
      const data = await login(details);
      if (data.success) {
        toast.success(`Loggedin Successfully.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setDetails(initialState);
        localStorage.setItem("e-comm-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(`${data.message}`, {
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
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="auth-container">
        <Box>
          <div className="auth-card">
            <div className="auth-header">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <img src={logo} className="logo" alt="logo" />
                </Grid>
                <Grid item xs={10}>
                  <Typography className="Typography heading">
                    {page === "login" ? "Login" : "Register"}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <div
              className={`login-form ${
                page === "register" ? "register-form" : ""
              }`}
            >
              {page !== "login" && (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  className="Grid input-group"
                >
                  <Grid item xs={2}>
                    <PersonIcon
                      sx={{
                        color: "#212A3E",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      variant="outlined"
                      label="Name"
                      name="name"
                      required
                      value={details.name}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              )}

              <Grid
                container
                spacing={2}
                alignItems="center"
                className="Grid input-group"
              >
                <Grid item xs={2}>
                  <EmailIcon
                    sx={{
                      color: "#212A3E",
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Input
                    type="email"
                    variant="outlined"
                    label="Email"
                    name="email"
                    required
                    value={details.email}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                alignItems="center"
                className="Grid input-group"
              >
                <Grid item xs={2}>
                  {show ? (
                    <VisibilityIcon
                      sx={{
                        color: "#212A3E",
                        cursor: "pointer",
                      }}
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      sx={{
                        color: "#212A3E",
                        cursor: "pointer",
                      }}
                      onClick={() => setShow(!show)}
                    />
                  )}
                </Grid>
                <Grid item xs={9}>
                  <Input
                    type={show ? "text" : "password"}
                    variant="outlined"
                    label="Password"
                    required
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {page !== "login" && (
                <>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    className="Grid input-group"
                  >
                    <Grid item xs={2}>
                      {show ? (
                        <VisibilityIcon
                          sx={{
                            color: "#212A3E",
                            cursor: "pointer",
                          }}
                          onClick={() => setShow(!show)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{
                            color: "#212A3E",
                            cursor: "pointer",
                          }}
                          onClick={() => setShow(!show)}
                        />
                      )}
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        type={show ? "text" : "password"}
                        variant="outlined"
                        label="Repeat Password"
                        required
                        name="repeatPassword"
                        value={details.repeatPassword}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    className="Grid input-group"
                  >
                    <Grid item xs={2}>
                      <PhoneIcon
                        sx={{
                          color: "#212A3E",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        type="tel"
                        label="Phone"
                        variant="outlined"
                        required
                        name="phone"
                        value={details.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    className="Grid input-group"
                  >
                    <Grid item xs={2}>
                      <HomeIcon
                        sx={{
                          color: "#212A3E",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        type="text"
                        multiline
                        rows={5}
                        label="Address"
                        variant="outlined"
                        required
                        name="address"
                        value={details.address}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className="Grid input-group">
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: "5px" }}>
                        Profile Pic
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        className="form-control form-control-md"
                        onChange={(e) => handleUpload(e.target.files[0])}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              <div className="buttons">
                <Button
                  variant="contained"
                  className="Button btn"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {page === "login" ? "Sign In" : "Sing Up"}
                </Button>

                {page === "login" && <ForgotModal />}
              </div>

              <Typography
                className="Typography already"
                onClick={() =>
                  page === "login" ? setPage("register") : setPage("login")
                }
              >
                {page === "login"
                  ? "Don't have an account? Signup"
                  : "Already have an account? Signin"}
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Login;
