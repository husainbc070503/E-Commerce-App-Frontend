import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";
import styled from "@emotion/styled";
import logo from "../../images/logo.png"

const Text = styled(Typography)`
  font-size: 20px;
  margin: 20px 0;
  color: #fff;
  text-transform: capitalize;
`;

const Email = styled(TextField)`
  width: 100%;
  margin-bottom: 30px;
`;

const SubsButton = styled(Button)`
  background: #6c00ff;
  color: #fff;
`;

const Copyright = styled(Typography)`
  margin: 20px 0 0;
  color: #424874;
  text-align: center;
`;

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-container">
        <Box>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Text>Subscribe to get important updates</Text>
              <Email label="Email" variant="outlined" />
              <SubsButton variant="contained">Subscribe</SubsButton>
            </Grid>
            <Grid item md={4}>
              <Text>Follow Us On</Text>
              <div className="icons">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
            </Grid>
            <Grid item md={4}>
              <Text>
                Call Us <br /> +91 8879525311
              </Text>
            </Grid>
          </Grid>
          <Copyright>
            Copyright &copy; ElectroWorld - 2023
          </Copyright>
        </Box>
      </div>
    </section>
  );
};

export default Footer;
