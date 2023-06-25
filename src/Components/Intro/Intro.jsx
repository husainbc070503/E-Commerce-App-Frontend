import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";
import hero from "../../images/hero.jpg";
import { useGlobalUserContext } from "../../Contexts/UserContext";

const Intro = () => {
  const { user } = useGlobalUserContext();

  return (
    <div className="ecom-container">
      <Box>
        <Grid container spacing={4}>
          <Grid item md={4} marginRight="4rem">
            <div className="heading">
              <span>Welcome to</span>
              <h1>ElectroWorld.</h1>
            </div>
            <div className="text">
              <Typography>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
                quaerat quisquam doloremque voluptatibus dolore ipsum quia
                consectetur eveniet maiores.
              </Typography>
            </div>
            <Link className="show-now-link" to={user ? "products" : "login"}>
              Shop Now
            </Link>
          </Grid>
          <Grid item md={4}>
            <div className="image-block">
              <img src={hero} alt="img" className="intro-image" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Intro;
