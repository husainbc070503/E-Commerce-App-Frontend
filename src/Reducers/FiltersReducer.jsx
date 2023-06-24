export const FilterReducer = (state, action) => {
  switch (action.type) {
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "SORT_VALUE":
      return {
        ...state,
        sorting: action.payload,
      };

    case "GET_PRODUCTS": {
      let priceArr = action.payload.map((item) => item.price);
      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: action.payload,
        filter: {
          ...state.filter,
          price: maxPrice,
          maxP: maxPrice,
        },
      };
    }

    case "SORTING_PRODUCTS": {
      let { filteredProducts, sorting } = state;
      let newFilteredProds = filteredProducts;

      const sortProds = (a, b) => {
        if (sorting === "lowest") return a.price - b.price;

        if (sorting === "highest") return b.price - a.price;

        if (sorting === "a-z") return a.name.localeCompare(b.name);

        if (sorting === "z-a") return b.name.localeCompare(a.name);
      };

      newFilteredProds = newFilteredProds.sort(sortProds);

      return {
        ...state,
        filteredProducts: newFilteredProds,
      };
    }

    case "UPDATE_PRODUCTS":
      const { name, value } = action.payload;

      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS": {
      let { allProducts } = state;
      let tempProds = allProducts;

      let { search, category, company, price, rating } = state.filter;

      if (search !== "")
        tempProds = tempProds.filter((item) =>
          item.name.toLowerCase().includes(search)
        );

      if (category !== "all")
        tempProds = tempProds.filter((item) => item.category.name === category);

      if (company !== "all")
        tempProds = tempProds.filter(
          (item) => item.company.name.toLowerCase() === company.toLowerCase()
        );

      if (price === 0)
        tempProds = tempProds.filter((item) => item.price === price);
      else tempProds = tempProds.filter((item) => item.price <= price);

      return {
        ...state,
        filteredProducts: tempProds,
      };
    }

    case "CLEAR_FILTERS":
      return {
        ...state,
        filter: {
          ...state.filter,
          search: "",
          category: "all",
          company: "all",
          price: state.filter.maxP,
          maxP: state.filter.maxP,
          minP: 0,
        },
      };

    default:
      break;
  }
};
