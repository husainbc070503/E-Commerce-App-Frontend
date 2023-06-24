import {
  Box,
  Button,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";
import "./Products.css";
import styled from "@emotion/styled";
import { indigo } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const CategoryButton = styled(Button)`
  display: block;
  background: transparent;
  color: #93b5c6;
  text-transform: capitalize;
  text-align: start;
  font-size: 16px;

  &:hover {
    color: #191919;
  }
`;

const CompanySelect = styled(Select)`
  width: 100%;
  text-transform: capitalize;
`;

const Options = styled(MenuItem)`
  text-transform: capitalize;
  font-size: 16px;
`;

const Heading = styled(Typography)`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
`;

const ClrButton = styled(Button)`
  background: #b799ff;
  color: #0c134f;

  &:hover {
    background: #0c134f;
    color: #fff;
  }
`;

const Filters = () => {
  const theme = createTheme({
    palette: {
      primary: indigo,
    },
  });

  const {
    allProducts,
    filter: { search, category, company, price, maxP, minP },
    updateFilterValue,
    clearFilters,
  } = useGlobalFilterContext();

  const getData = (data, attr) => {
    let newData = data.map((item) => item[attr]);
    newData = newData.map((i) =>
      i.isActive || i.isProductsAvalaible ? i.name : ""
    );
    return ["all", ...new Set(newData)];
  };

  const categoryData = getData(allProducts, "category");
  const companyData = getData(allProducts, "company");

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <div className="search-form">
          <TextField
            label="Search"
            variant="outlined"
            name="search"
            value={search}
            style={{ width: "100%" }}
            onChange={(e) => updateFilterValue(e.target.name, e.target.value)}
          />
        </div>

        <div className="category-container">
          <Box>
            <Heading>Category</Heading>
            {categoryData &&
              categoryData.map((cat) => {
                return (
                  <CategoryButton
                    name="category"
                    key={cat}
                    value={cat}
                    className={`Button ${cat === category ? "active" : ""}`}
                    onClick={(e) =>
                      updateFilterValue(e.target.name, e.target.value)
                    }
                  >
                    {cat}
                  </CategoryButton>
                );
              })}
          </Box>
        </div>

        <div className="company-container">
          <Box>
            <Heading>Company</Heading>
            <CompanySelect
              id="demo-simple-select"
              value={company}
              name="company"
              onChange={(e) => updateFilterValue(e.target.name, e.target.value)}
            >
              {companyData.map((com) => {
                return (
                  <Options value={com} key={com}>
                    {com === "all" ? "All" : com}
                  </Options>
                );
              })}
            </CompanySelect>
          </Box>
        </div>

        <div className="price-container">
          <Box>
            <Heading>Price</Heading>
            <Typography>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {price}
            </Typography>
            <input
              type="range"
              name="price"
              max={maxP}
              min={minP}
              className="price-range"
              value={price}
              onChange={(e) => updateFilterValue(e.target.name, e.target.value)}
            />
          </Box>
        </div>

        <div className="clear-filters">
          <ClrButton variant="contained" onClick={clearFilters}>
            Clear Filters
          </ClrButton>
        </div>
      </ThemeProvider>
    </Box>
  );
};

export default Filters;
