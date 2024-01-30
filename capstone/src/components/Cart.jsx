import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api/products/products";
import ProductCard from "./ProductCard/ProductCard";
import CartCard from "./CartCard/CartCard";

export default function Cart({ userId, userCart, setUserCart }) {
  const [productsList, setProductsList] = useState(userCart);
  const [detailedCart, setDetailedCart] = useState([]);
  const [mySearchCart, setMySearchCart] = useState(userCart);
  const [grandTotal, setGrandTotal] = useState(0);
  console.log(userCart);
  useEffect(() => {
    if (!userCart) return;
    async function getCartDetails() {
      try {
        const allProductsList = await getAllProducts();
        const cartDetails = [];
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
    <>
      <h2>Cart</h2>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "start",
        }}
      >
        {" "}
        <div className="cart-card-container">
          <div>Total: ${grandTotal.toFixed(2)}</div>
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
    </>
  );
}
