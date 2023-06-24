import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ProductReducer } from "../Reducers/ProductsReducer";
import axios from "axios";
import { API, URL } from "../Utils/API";

const AppContext = createContext();

const initialstate = {
  products: [],
  featuredProducts: [],
  isLoading: false,
  isError: false,
  singleProduct: {},
  isSingleLoading: false,
  reviews: [],
  allProReviews: [],
};

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialstate);

  const getProducts = async (url) => {
    try {
      dispatch({ type: "SET_LOADING" });

      const res = await fetch(`${url}/api/product/getAllProducts`);
      const data = await res.json();

      dispatch({ type: "SET_PRODUCTS", payload: data.data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (url) => {
    try {
      dispatch({ type: "SET_SINGLE_LOADING" });

      const res = await axios.get(url);
      const product = await res.data;

      dispatch({ type: "SET_SINGLE_PRODUCT", payload: product.pro });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  const getReviews = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) dispatch({ type: "SET_REVIEWS", payload: data.revs });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getProductsReviews = async (url) => {
    try {
      const res = await fetch(`${url}/api/review/getAllReviews`);
      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_PROS_REVIEWS", payload: data.revs });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(URL);
    getProductsReviews(URL);
  }, [state.reviews]);

  return (
    <AppContext.Provider
      value={{ ...state, getSingleProduct, getReviews, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalProductContext = () => useContext(AppContext);

export { ProductContext, useGlobalProductContext };
