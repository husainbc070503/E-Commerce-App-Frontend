export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "SET_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: action.payload.filter((p) => p.featured === true),
      };

    case "SET_SINGLE_LOADING":
      return { ...state, isSingleLoading: true };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    case "SET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((rev) => rev._id !== action.payload),
      };

    case "SET_PROS_REVIEWS":
      return {
        ...state,
        allProReviews: action.payload,
      };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };
  }
};
