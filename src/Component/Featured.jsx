"use state";
import React from "react";
import { client } from "../../sanity/lib/client";
import { useEffect, useState } from "react";
import "../Styles/page.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const Featured = (props) => {
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
    <ul className="fs_feat_wrapper">
          <li className="featured-card">
            <Image src={image01.url} width={170} height={250} alt="" />
            <p>{title}</p>
            <h2>
              <span>${price}</span>
            </h2>
            <h3 onClick={addToCart}>Add to Cart</h3>
            <Toaster
            position="top-center "
            reverseOrder={true}
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{ className: "", style: { zIndex: 99999 } }}
          />
            <div className="new">
              <h4>NEW</h4>
            </div>
          </li>
    </ul>
  );
};

export default Featured;
