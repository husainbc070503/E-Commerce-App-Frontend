import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductContext } from "./Contexts/ProductContext";
import { FilterContext } from "./Contexts/FilterContext";
import { CartContext } from "./Contexts/CartContext";
import { UserContext } from "./Contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContext>
      <FilterContext>
        <CartContext>
          <App />
        </CartContext>
      </FilterContext>
    </ProductContext>
  </React.StrictMode>
);
