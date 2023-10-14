"use client";
import { createSlice } from "@reduxjs/toolkit";

// Define default values for items, totalAmount, and totalQuantity
const defaultItems = [];
const defaultTotalAmount = 0;
const defaultTotalQuantity = 0;

// Check if localStorage is available
const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

// Use the default values if localStorage is not available
const items = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem("cartItems")) || defaultItems
  : defaultItems;

const totalAmount = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem("totalAmount")) || defaultTotalAmount
  : defaultTotalAmount;

const totalQuantity = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem("totalQuantity")) || defaultTotalQuantity
  : defaultTotalQuantity;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  if (isLocalStorageAvailable) {
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),

        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    removeItem(state, action) {
      const _id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    deleteItem(state, action) {
      const _id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    clearCart(state) {
      // Reset the cart state to initial values
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Clear local storage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("totalQuantity");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
