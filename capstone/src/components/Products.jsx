import { getAllProducts } from "../api/products/products";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import Dropdown from "react-dropdown";

export default function Products({ userCart, setUserCart, userId }) {
  const [allProductsList, setAllProducts] = useState([]);
  const [mySavedProducts, setAllSavedProducts] = useState([]);
  const [category, setCategory] = useState("all");

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

  function handleDropdown(e) {
    if (e.value != "all") {
      const searchResults = mySavedProducts.filter(
        (product) => product.category == e.value.toLowerCase()
      );
      setAllProducts(searchResults);
    } else {
      setAllProducts(mySavedProducts);
    }
  }

  const options = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  return (
    <div className="all-products">
      <h2>All the Products!</h2>{" "}
      <div className="search-section">
        <div className="search">
          <div>Type to Search Products by Title:</div>
          <input type="text" onChange={handleSearch} className="search-input" />
        </div>
        <div>-OR-</div>
        <div className="category-dropdown">
          <div>Click to Filter Products by Category: </div>
          <div className="dropdown-parent">
            <Dropdown
              options={options}
              onChange={handleDropdown}
              value="all"
              placeholder="Select an option"
              className="dropdown"
            />
          </div>
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
