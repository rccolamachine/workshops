import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  userId,
  userCart,
  setUserCart,
}) {
  let exists = false;
  const { category, description, id, image, price, rating, title } = product;
  async function handleAdd() {
    for (let item of userCart) {
      if (product.id === item.productId) {
        item.quantity += 1;
        exists = true;
      }
      setUserCart(userCart);
    }
    console.log(exists);
    !exists && userCart.push({ productId: product.id, quantity: 1 });
    setUserCart(userCart);
    localStorage.setItem("cart", JSON.stringify(userCart));
    window.location.reload();
  }

  return (
    <div className="product-card-container">
      <div className="product-title">{title}</div>
      <div className="product-price">{description}</div>
      <div className="product-category">{category}</div>
      <img src={image} alt={`A product image for ${title}`} />
      <div className="product-rating">
        Rating: {rating.rate}/5 ({rating.count} reviews)
      </div>
      <div className="product-price">${price?.toFixed(2)}</div>
      <button className="add-to-cart" onClick={handleAdd}>
        Add To Cart
      </button>
    </div>
  );
}
