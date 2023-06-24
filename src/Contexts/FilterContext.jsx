import React, { createContext, useContext, useEffect, useReducer } from "react";
import { FilterReducer } from "../Reducers/FiltersReducer";
import { useGlobalProductContext } from "./ProductContext";

const Filter = createContext();

const initialstate = {
  filteredProducts: [],
  allProducts: [],
  sorting: "lowest",
  grid_view: true,
  filter: {
    search: "",
    category: "all",
    company: "all",
    price: 0,
    maxP: 0,
    minP: 0,
  },
};

const FilterContext = ({ children }) => {
  const [state, dispatch] = useReducer(FilterReducer, initialstate);

  const { products } = useGlobalProductContext();

  const setGridView = () => dispatch({ type: "SET_GRID_VIEW" });

  const setListView = () => dispatch({ type: "SET_LIST_VIEW" });

  const sort = (value) => dispatch({ type: "SORT_VALUE", payload: value });

  const updateFilterValue = (name, value) =>
    dispatch({ type: "UPDATE_PRODUCTS", payload: { name, value } });

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.filter, state.sorting]);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS", payload: products });
  }, [products]);

  const clearFilters = () => dispatch({ type: "CLEAR_FILTERS" });

  return (
    <Filter.Provider
      value={{
        ...state,
        updateFilterValue,
        sort,
        setGridView,
        setListView,
        clearFilters,
      }}
    >
      {children}
    </Filter.Provider>
  );
};

const useGlobalFilterContext = () => useContext(Filter);

export { FilterContext, useGlobalFilterContext };
