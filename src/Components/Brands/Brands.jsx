import React from "react";
import { Box } from "@mui/material";
import { Brands_Images } from "../../Utils/Brands_Images";
import './Brands.css'

const Brands = () => {
  return (
    <section className="odd-section">
      <div className="ecom-container odd-container">
        <Box>
          <div className="heading">
            <h1 style={{ textAlign: "center" }}>Our Brands</h1>
          </div>
          <div className="brands">
            {Brands_Images.map((url, index) => {
              return (
                <div className="image" key={index}>
                  <img src={url} />
                </div>
              );
            })}
          </div>
        </Box>
      </div>
    </section>
  );
};

export default Brands;
