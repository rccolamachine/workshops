import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products/products";

import ProductCard from "./ProductCard/ProductCard";
// import { deletePlayer } from "../API";

export default function SingleProduct({ userCart, setUserCart, userId }) {
  const [singleProduct, setSingleProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("hello");
  useEffect(() => {
    async function getProductData() {
      try {
        const productObj = await getProductById(id);
        console.log(productObj);
        if (productObj === null) {
          navigate("/");
        } else {
          setSingleProduct(productObj);
        }
        return;
      } catch (err) {
        throw err;
      }
    }
    getProductData();
  }, [navigate]);

  async function handleDelete() {
    try {
      const result = await deletePlayer(id);
      if (result.success) {
        alert(`Puppy with id: ${id} successfully removed from roster.`);
        navigate("./");
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(singleProduct?.rating);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <ProductCard
          product={singleProduct}
          component={"detail"}
          key={singleProduct.id}
          userCart={userCart}
          setUserCart={setUserCart}
          userId={userId}
        />{" "}
      </div>
    </>
  );
}
