import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products/products";

import ProductCard from "./ProductCard/ProductCard";

export default function SingleProduct({ userCart, setUserCart, userId }) {
  const [singleProduct, setSingleProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getProductData() {
      try {
        const productObj = await getProductById(id);
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="single-product"
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
