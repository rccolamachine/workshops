import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Navigations from "./Navigations";
import Cart from "./Cart";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import { getCartByUserId } from "../api/cart/cart";
import Checkout from "./Checkout";

import "../style/index.css";

const App = () => {
  const [userId, setUserId] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setUserId(localUserId);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const localCart = JSON.parse(localStorage.getItem("cart"));

    async function getUserCart() {
      try {
        const mySavedCart = await getCartByUserId(userId);
        setUserCart(mySavedCart);
        localStorage.setItem("cart", JSON.stringify(mySavedCart));
      } catch (err) {
        console.log(err);
      }
    }
    if (localCart === "undefined" || !localCart) {
      getUserCart();
    } else {
      setUserCart(localCart);
    }
  }, [userId]);

  return (
    <>
      <BrowserRouter>
        <Navigations
          // setUserId={setUserId}
          userId={userId}
          // userCart={userCart}
          // setUserCart={setUserCart}
        />
        <h1 className="site-title">The Fake Store</h1>
        <h2 className="site-byline">...for all your fake needs!</h2>
        {userId && (
          <Cart
            userId={userId}
            userCart={userCart}
            setUserCart={setUserCart}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
          />
        )}
        {!userId && <Login setUserId={setUserId} userId={userId} />}
        <Routes>
          <Route
            path="/*"
            element={
              <Products
                userId={userId}
                userCart={userCart}
                setUserCart={setUserCart}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <SingleProduct
                userCart={userCart}
                setUserCart={setUserCart}
                userId={userId}
              />
            }
          />

          <Route
            path="/logout"
            element={<Logout setUserId={setUserId} userId={userId} />}
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                userCart={userCart}
                setUserCart={setUserCart}
                grandTotal={grandTotal}
              />
            }
          />
          {/* <Route
            path="/cart"
            element={

            } */}
          {/* /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
