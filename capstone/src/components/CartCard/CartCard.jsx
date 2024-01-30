import React, { useEffect, useState } from "react";
import "./CartCard.css";
import { useNavigate } from "react-router-dom";

export default function CartCard({ product, userCart, setUserCart }) {
  const { cartInfo, prodInfo } = product;

  function handleDecrease(e) {
    for (let item of userCart) {
      if (product.cartInfo.productId == item.productId) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          const index = userCart.indexOf(item);
          if (index !== -1) {
            userCart.splice(index, 1);
          }
          console.log(userCart);
        }
      }
      console.log(item.quantity);
      setUserCart(userCart);
      localStorage.setItem("cart", JSON.stringify(userCart));
      window.location.reload();
    }
  }
  function handleIncrease(e) {
    for (let item of userCart) {
      if (product.cartInfo.productId == item.productId) {
        item.quantity += 1;
      }
      setUserCart(userCart);
      localStorage.setItem("cart", JSON.stringify(userCart));
      window.location.reload();
    }
  }

  return (
    <div className="cart-card-container">
      <div className="title-price">
        {" "}
        <div className="cart-cart-title">{prodInfo.title}</div>
        <div className="cart-product-price"></div>${prodInfo.price?.toFixed(2)}{" "}
        each
      </div>
      {/* <div className="cart-price">{prodInfo.description}</div> */}
      <img src={prodInfo.image} alt={`A product image for ${prodInfo.title}`} />
      <div className="quantity-cost">
        {" "}
        <div className="cart-product-quantity">
          Quantity: {cartInfo.quantity}
        </div>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
        <div className="total-product-cost">
          Total: ${(cartInfo.quantity * prodInfo.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
