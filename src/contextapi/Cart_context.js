import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/CartReducer";

const CartContext = createContext();


const getLocalCartData = () => {
    let localStorageData = localStorage.getItem("pummyCart");

    if (!localStorageData) {
        // If localStorageData is null, return an empty array
        return [];
    }

    try {
        return JSON.parse(localStorageData);
    } catch (error) {
        console.error("Error parsing local storage data:", error);
        return [];
    }
};

const initialState = {
//   cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };


   // to clear the cart
   const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };



  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("pummyCart", JSON.stringify(state.cart));
  }, [state.cart]);






  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem , clearCart, setDecrease, setIncrement,}}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
