import { Box, ThemeProvider, createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import React from "react";
import ReviewList from "./ReviewList";
import ReviewModal from "./ReviewModal";

const ProReview = ({ pro }) => {
  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <h1 className="more-header">Product Reviews</h1>
        <div className="rev-list">
          <ReviewList pro={pro} />
        </div>
        <div className="add-rev">
          <ReviewModal />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ProReview;
