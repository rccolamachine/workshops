import { getAllProducts } from "../api/products/products";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";

export default function Products({ userCart, setUserCart, userId }) {
  const [allProductsList, setAllProducts] = useState([]);
  const [mySavedProducts, setAllSavedProducts] = useState([]);
  useEffect(() => {
    async function allProducts() {
      try {
        const productsList = await getAllProducts();
        setAllProducts(productsList);
        setAllSavedProducts(productsList);
      } catch (err) {
        console.log(err);
      }
    }
    allProducts();
  }, []);

  function handleSearch(e) {
    const searchResults = mySavedProducts.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllProducts(searchResults);
  }

  return (
    <div className="all-products">
      <div>
        <h2>All the Products!</h2>
        <div className="search">
          <div>Search All Products by Title:</div>
          <input type="text" onChange={handleSearch} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {allProductsList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userCart={userCart}
            setUserCart={setUserCart}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}
