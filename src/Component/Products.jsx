import React from "react";
import { client } from "../../sanity/lib/client";
import { useEffect, useState } from "react";
import "../Styles/page.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const Products = (props) => {
    const { _id, title, image01, price } = props.item
  const dispatch = useDispatch();

  const addToCart = () => {
    toast.success("Item added..");
    dispatch(
      cartActions.addItem({
        _id,
        title,
        image01,
        price,
      })
    );
  };

  return (
    <ul className="product_cardwrapper">
      <li className="product_card">
        <Image src={image01.url} width={100} height={150} alt="" />
        <p>{title}</p>
        <h2>
          <span>${price}</span>
        </h2>
        <div className="btn_cart">
          <i className="bx bx-cart" onClick={addToCart}></i>
          <Toaster
            position="top-center "
            reverseOrder={true}
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{ className: "", style: { zIndex: 99999 } }}
          />
        </div>
      </li>
    </ul>
  );
};

export default Products;
