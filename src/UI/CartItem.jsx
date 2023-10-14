"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import "../Styles/cart.css"

const CartItem = ({item}) => {
  const { _id, title, price, image01, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        price,
        image01,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(_id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(_id));
  };
  return (
    <div className="cart__container">
      <article className="cart__card">
        <div className="cart__box">
          <Image src={image01.url} alt="" width={60} height={70} className="cart__img" />
        </div>

        <div className="cart__details">
          <h3 className="cart__title">{title}</h3>
          <span className="cart__price">${totalPrice}</span>
          <div className="cart__amount">
            <div className="cart__amount-content">
              <span className="cart__amount-box">
                <i className="bx bx-minus" onClick={decreaseItem}></i>
              </span>

              <span className="cart__amount-number">{quantity}</span>
              <span className="cart__amount-box">
                <i className="bx bx-plus" onClick={incrementItem}></i>
              </span>
            </div>
            <i className="bx bx-trash-alt cart__amount-trash" onClick={deleteItem}></i>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CartItem;
