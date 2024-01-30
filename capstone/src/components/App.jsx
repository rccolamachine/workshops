import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Navigations from "./Navigations";
import Cart from "./Cart";
import Products from "./Products";
import { getCartByUserId } from "../api/cart/cart";

import "../style/index.css";

const App = () => {
  const [userId, setUserId] = useState([]);
  const [userCart, setUserCart] = useState([]);

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
        <div>{userId}</div>
        <Navigations
          // setUserId={setUserId}
          userId={userId}
          // userCart={userCart}
          // setUserCart={setUserCart}
        />
        {userId && (
          <Cart userId={userId} userCart={userCart} setUserCart={setUserCart} />
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
            path="/logout"
            element={<Logout setUserId={setUserId} userId={userId} />}
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
