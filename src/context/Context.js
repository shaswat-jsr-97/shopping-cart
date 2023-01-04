import faker from "faker";
import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { Button } from "react-bootstrap";
import { cartReducer, productReducer } from "./Reducer";

const Cart = createContext();
faker.seed(98);
//Cart will be the name of ourcontext or state that we have created
//Children will come from index.js from where it starts
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  //   console.log(products);
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    // Cart.Provider will wrap whole of our React app
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>

    // <Cart.Provider value={{products}}>{children}</Cart.Provider>
    // The above value way is also a way to send the products to all the files and pages,
    // We will be using Reducer to send it to all pages.
  );
};


// We export htis context below, by accessing it by useContext amd it takes the 
// context, i.e. Cart here
export const CartState = () => {
  return useContext(Cart);
};
export default Context;
