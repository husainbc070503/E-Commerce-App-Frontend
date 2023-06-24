import { Box } from "@mui/material";
import React from "react";

import Intro from "./Intro/Intro";
import Featured from "./FeaturedProducts/Featured";
import Services from "./Services/Services";
import Brands from "./Brands/Brands";

const Home = () => {
  return (
    <Box>
      <Intro />
      <Featured />
      <Services />
      <Brands />
    </Box>
  );
};

export default Home;
