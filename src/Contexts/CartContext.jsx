import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "../Reducers/CartReducer";
import { useNavigate } from "react-router-dom";

const Cart = createContext();

const getUserCart = () => {
  const userCart = JSON.parse(localStorage.getItem("user-e-cart"));
  return userCart ? userCart : [];
};

const initialstate = {
  cart: getUserCart(),
  items: 0,
  totalPrice: 0,
};

const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialstate);

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });

  const incrementQuantity = (id, quantity) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, quantity } });

  const decrementQuantity = (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    if (state.cart === []) localStorage.removeItem("user-e-cart");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("user-e-cart");
  };

  useEffect(() => {
    dispatch({ type: "GET_CART" });
    localStorage.setItem("user-e-cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <Cart.Provider
      value={{
        ...state,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

const useGlobalCartContext = () => useContext(Cart);

export { CartContext, useGlobalCartContext };
