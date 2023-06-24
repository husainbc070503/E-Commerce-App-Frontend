import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormLabel,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import { indigo } from "@mui/material/colors";
import { toast } from "react-toastify";
import { URL } from "../../Utils/API";

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

const Label = styled(FormLabel)`
  color: #191919;
  font-weight: 500;
  margin: 10px 0;
`;

const initialState = { email: "", otp: "", password: "", confirmPassword: "" };

const ForgotModal = () => {
  const [open, setOpen] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [update, setUpdate] = useState(initialState);

  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  const sendLink = async () => {
    try {
      const res = await fetch(`${URL}/api/user/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: update.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`OTP sent. Check your mail`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setPassModal(true);
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

  const handleChange = (e) =>
    setUpdate({ ...update, [e.target.name]: e.target.value });

  const updatePassword = async () => {
    if (update.password !== update.confirmPassword) {
      toast.error("Mismatch Password and Confirm Password", {
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

    try {
      const res = await fetch(`${URL}/api/user/updatePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: update.email,
          password: update.password,
          otp: update.otp,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Passoword Updated.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setPassModal(false);
        setUpdate(initialState);
        setOpen(false)
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
      <div>
        <Button
          onClick={() => setOpen(true)}
          sx={{ color: "#3C486B", textTransform: "capitalize" }}
        >
          Forgot Password
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {!passModal ? (
              <>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: "10px" }}
                >
                  Enter your Email
                </Typography>
                <div className="input-group">
                  <FormControl fullWidth>
                    <TextField
                      type="email"
                      label="Email"
                      name="email"
                      value={update.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                  onClick={sendLink}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: "10px", fontWeight: "bold" }}
                >
                  Update Password
                </Typography>
                <div className="input-group">
                  <FormControl fullWidth>
                    <Label>Enter OTP</Label>
                    <TextField
                      type="number"
                      label="OTP"
                      name="otp"
                      value={update.otp}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <div className="input-group">
                    <FormControl fullWidth>
                      <Label>Password</Label>
                      <TextField
                        type="password"
                        value={update.password}
                        name="password"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="input-group">
                  <FormControl fullWidth>
                    <Label>Confirm Password</Label>
                    <TextField
                      type="password"
                      name="confirmPassword"
                      value={update.confirmPassword}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                  onClick={updatePassword}
                >
                  Update
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default ForgotModal;
