import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api/products/products";
import CartCard from "./CartCard/CartCard";

export default function Cart({
  userCart,
  setUserCart,
  grandTotal,
  setGrandTotal,
}) {
  const [detailedCart, setDetailedCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userCart) return;

    async function getCartDetails() {
      try {
        const cartDetails = [];
        const allProductsList = await getAllProducts();

        for (let cartProduct of userCart) {
          for (let allProduct of allProductsList) {
            if (cartProduct.productId === allProduct.id) {
              cartDetails.push({ cartInfo: cartProduct, prodInfo: allProduct });
            }
          }
        }
        setDetailedCart(cartDetails);
      } catch (err) {
        console.log(err);
      }
    }
    getCartDetails();
  }, [userCart]);

  useEffect(() => {
    async function calculateCartTotal() {
      let cartTotal = 0;
      for (let item of detailedCart) {
        const singleProdPrice = item.cartInfo.quantity * item.prodInfo.price;
        cartTotal += singleProdPrice;
      }
      setGrandTotal(cartTotal);
      return cartTotal;
    }
    calculateCartTotal();
  }, [detailedCart]);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "start",
        }}
      >
        {" "}
        {/* <div className="cards-container"> */}
        <div className="all-cart-cards-container">
          <div className="cart-total-container">
            <div className="cart-total">Total: ${grandTotal.toFixed(2)}</div>
            <button onClick={() => navigate("./checkout")}>Check Out</button>
          </div>
          {detailedCart.map((product) => (
            <CartCard
              key={product.cartInfo.productId}
              product={product}
              userCart={userCart}
              setUserCart={setUserCart}
            />
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
