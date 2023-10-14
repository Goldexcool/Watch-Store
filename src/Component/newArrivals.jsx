import React from "react";
import { client } from "../../sanity/lib/client";
import { useEffect, useState } from "react";
import "../Styles/page.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const NewArrivals = (props) => {
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
    <ul className="newArrivals_cardwrapper">
      <li className="na_card">
        <Image src={image01.url} width={150} height={250} alt="" className="newImage"/>
        <p>{title}</p>
        <h2>
          <span>${price}</span>
        </h2>
        <div className="nA_cart" onClick={addToCart}>
            <h3 >ADD TO CART</h3>
          <Toaster
            position="top-center"
            reverseOrder={true}
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{ className: "", style: { zIndex: 99999 } }}
          />
        </div>
      </li>
    </ul>
  );
};

export default NewArrivals;
