export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, userQuantity: 1 }],
      };

    case "INCREASE_QUANTITY":
      const { id, quantity } = action.payload;

      let updateCart = state.cart.map((item) => {
        // map returns array updated
        if (item._id === id) {
          return {
            ...item,
            userQuantity:
              item.userQuantity + 1 < quantity
                ? item.userQuantity + 1
                : quantity,
          };
        } else return item;
      });

      return {
        ...state,
        cart: updateCart,
      };

    case "DECREASE_QUANTITY":
      let updateDecCart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            userQuantity: item.userQuantity - 1 < 1 ? 1 : item.userQuantity - 1,
          };
        } else return item;
      });

      return {
        ...state,
        cart: updateDecCart,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "GET_CART":
      const totalPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.userQuantity,
        0
      );

      return {
        ...state,
        totalPrice,
        items: state.cart.length,
      };

    default:
      break;
  }
};
