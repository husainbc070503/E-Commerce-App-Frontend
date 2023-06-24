import { Grid, MenuItem, Select, Typography, createTheme } from "@mui/material";
import React from "react";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { indigo } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const SortSelect = styled(Select)`
  width: 100%;
  text-transform: capitalize;
`;

const Options = styled(MenuItem)`
  text-transform: capitalize;
`;

const SortFilter = () => {
  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  const { sorting, sort, setGridView, setListView, filteredProducts } =
    useGlobalFilterContext();

  const menu = ["lowest", "highest", "a-z", "z-a"];

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <div className="icons">
            <MenuIcon
              sx={{
                marginRight: "12px",
                fontSize: "32px",
                background: "#C4B0FF",
                padding: "4px",
                color: "#40128B",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={setListView}
            />
            <GridViewIcon
              sx={{
                background: "#C4B0FF",
                color: "#40128B",
                fontSize: "32px",
                padding: "4px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={setGridView}
            />
          </div>
        </Grid>
        <Grid item md={4}>
          <Typography sx={{ fontSize: "20px", color: "#40128B" }}>
            {filteredProducts.length} Products
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <SortSelect
            name="sort-value"
            onChange={(e) => sort(e.target.value)}
            value={sorting}
          >
            {menu.map((m) => {
              return (
                <Options value={m}>
                  {m}
                  {m === "lowest" || m === "highest"
                    ? "(by price)"
                    : m === "a-z" || m === "z-a"
                    ? "(by name)"
                    : ""}
                </Options>
              );
            })}
          </SortSelect>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SortFilter;
