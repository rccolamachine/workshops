import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  userId,
  userCart,
  setUserCart,
  component,
}) {
  let exists = false;
  const navigate = useNavigate();
  const { category, description, id, image, price, rating, title } = product;
  async function handleAdd() {
    for (let item of userCart) {
      if (product.id === item.productId) {
        item.quantity += 1;
        exists = true;
      }
      setUserCart(userCart);
    }
    !exists && userCart.push({ productId: product.id, quantity: 1 });
    setUserCart(userCart);
    localStorage.setItem("cart", JSON.stringify(userCart));
    window.location.reload();
  }

  return (
    <div className="product-card-container">
      <div className="product-category">{category}</div>
      <div className="product-title">{title}</div>

      {component == "detail" && (
        <div className="product-description">{description}</div>
      )}

      <img src={image} alt={`A product image for ${title}`} />
      <div className="product-price">${price?.toFixed(2)} each</div>
      {component == "detail" && (
        <div className="product-rating">
          Rating: {rating?.rate}/5 ({rating?.count} reviews)
        </div>
      )}
      {component !== "detail" && (
        <button
          onClick={() => navigate(`/products/${id}`)}
          className="product-button"
        >
          See Details
        </button>
      )}
      {component == "detail" && (
        <button onClick={() => navigate(`/`)} className="product-button">
          Back to All Products
        </button>
      )}
      {userId && (
        <button className="product-button" onClick={handleAdd}>
          Add To Cart
        </button>
      )}
    </div>
  );
}
