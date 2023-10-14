"use client";
import { useSelector } from "react-redux";
import Carts from "../UI/Cart";
const Scart = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  console.log(showCart)
  return <> {showCart && <Carts />} </>;
};

export default Scart;
