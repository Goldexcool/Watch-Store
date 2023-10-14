"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../img/emptyCart.svg";
import { cartUiActions } from "../store/shopping-cart/cartUiSlice";
import CartItem from "../UI/CartItem";
import "../Styles/cart.css";
import { useRouter } from "next/navigation";
import { use } from "react";


const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  console.log(cartProducts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  const router = useRouter();
  const checkoutHandler = () => {
    router.push("/Signup");
  }

  return (
    <div className="cart" id="cart">
      <i
        className="bx bx-x cart__close"
        id="cart-close"
        onClick={toggleCart}
      ></i>

      <h2 className="cart__title-center">My Cart</h2>
      {cartProducts.length === 0 ? (
        <>
          <h6 style={{ textAlign: "center", marginTop: "2rem"}} className="item_text_cart">
            No item added to the cart
          </h6>
          <Image
            src={emptyCart}
            alt="emptyCart"
            width={100}
            height={100}
            style={{ width: "100%", height: "100%" }}
          />
        </>
      ) : (
        cartProducts.map((item, index) => <CartItem item={item} key={index} />)
      )}

      <div className="cart__prices">
        <span className="cart__prices-total">Sub-Total:${totalAmount}</span>

        <span className="cart__prices-item prices_item" onClick={checkoutHandler}>
          {" "}
          Checkout <i className="bx bx-right-arrow-alt alt"></i>
        </span>
      </div>
    </div>
  );
};

export default Cart;
