import { getAllProducts } from "../api/products/products";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";

export default function Products({ userCart, setUserCart }) {
  const [allProductsList, setAllProducts] = useState([]);
  const [mySavedProducts, setAllSavedProducts] = useState([]);
  console.log(userCart);
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
    <>
      <>
        <h1>All the Products!</h1>
        <div className="search">
          <div>Search All Products by Title:</div>
          <input type="text" onChange={handleSearch} />
        </div>
      </>

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
          />
        ))}
      </div>
    </>
  );
}
