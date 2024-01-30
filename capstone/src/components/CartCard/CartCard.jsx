import React, { useEffect, useState } from "react";
import "./CartCard.css";
import { useNavigate } from "react-router-dom";

export default function CartCard({ product, userCart, setUserCart }) {
  const { cartInfo, prodInfo } = product;
  const navigate = useNavigate();

  function handleDecrease(e) {
    for (let item of userCart) {
      if (product.cartInfo.productId == item.productId) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          const index = userCart.indexOf(item);
          if (index !== -1) {
            userCart.splice(index, 1);
          }
        }
      }
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
        <div
          className="cart-card-title"
          onClick={() => navigate(`/products/${product.cartInfo.productId}`)}
        >
          {prodInfo.title}
        </div>
      </div>
      <img src={prodInfo.image} alt={`A product image for ${prodInfo.title}`} />
      <div className="quantity-cost">
        {" "}
        <div className="cart-card-price">
          ${prodInfo.price?.toFixed(2)} each
        </div>
        <div className="cart-card-quantity">Quantity: {cartInfo.quantity}</div>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
        <div className="total-card-cost">
          Total: ${(cartInfo.quantity * prodInfo.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
