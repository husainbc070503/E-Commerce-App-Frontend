import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import NoCellIcon from "@mui/icons-material/NoCell";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoneyIcon from "@mui/icons-material/Money";
import PaidIcon from "@mui/icons-material/Paid";
import "./Services.css";
import styled from "@emotion/styled";

const Description = styled(Typography)`
  text-align: center;
  font-weight: bold;
  color: #4c4c6d;
`;

const Services = () => {
  return (
    <div className="ecom-container">
      <Box>
        <div className="heading">
          <div className="heading">
            <h1 style={{ textAlign: "center" }}>Services We Provide</h1>
          </div>
        </div>
      </Box>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <div className="service-card card-side">
            <div className="mid">
              <div className="icons">
                <LocalShippingIcon />
              </div>
              <Description>Super Fast and Free Delivery </Description>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="service-card">
            <div className="no-mid">
              <div className="icons">
                <NoCellIcon />
              </div>
              <Description>Non-Contact Shipping</Description>
            </div>
          </div>
          <div className="service-card card-top">
            <div className="no-mid">
              <div className="icons">
                <MoneyIcon />
              </div>
              <Description>Money Back Guaranteed</Description>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="service-card card-side">
            <div className="mid">
              <div className="icons">
                <PaidIcon />
              </div>
              <Description>Secure Payment System</Description>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Services;
