import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login/login";
import { getAllUsers } from "../api/user/user";

export default function Checkout({
  setUserId,
  userId,
  grandTotal,
  userCart,
  setUserCart,
}) {
  const navigate = useNavigate();
  const [sendName, setSendName] = useState(undefined);
  const [sendAddress, setSendAddress] = useState(undefined);
  const [sendPhone, setSendPhone] = useState(undefined);
  const [billName, setBillName] = useState(undefined);
  const [billAddress, setBillAddress] = useState(undefined);
  const [billPhone, setBillPhone] = useState(undefined);
  const [billCardNumber, setBillCardNumber] = useState(undefined);
  const [billExpiration, setBillExpiration] = useState(undefined);
  const [billCVV, setBillCVV] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitForm = {
      userCart,
      grandTotal,
      shipping: {
        sendName,
        sendAddress,
        sendPhone,
      },
      billing: {
        billName,
        billAddress,
        billPhone,
        billCardNumber,
        billExpiration,
        billCVV,
      },
    };
    setSubmitted(true);
    setUserCart([]);
    console.log(submitForm);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {!submitted && (
        <div className="check-out">
          <h2>Check Out!</h2>
          <div> Your total today comes to ${grandTotal.toFixed(2)}</div>
          {!!grandTotal && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="addresses-container">
                  <div className="address">
                    <h3>Shipping Info</h3>
                    <label>
                      Name*:{" "}
                      <input
                        value={sendName}
                        required
                        onChange={(e) => {
                          setSendName(e.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Address*:{" "}
                      <input
                        value={sendAddress}
                        required
                        onChange={(e) => {
                          setSendAddress(e.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Phone*:{" "}
                      <input
                        value={sendPhone}
                        required
                        onChange={(e) => {
                          setSendPhone(e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="address">
                    <h3>Billing Info</h3>
                    <label>
                      Name*:{" "}
                      <input
                        value={billName}
                        required
                        onChange={(e) => {
                          setBillName(e.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Address*:{" "}
                      <input
                        value={billAddress}
                        required
                        onChange={(e) => {
                          setBillAddress(e.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Phone*:{" "}
                      <input
                        value={billPhone}
                        required
                        onChange={(e) => {
                          setBillPhone(e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />{" "}
                    </label>
                    <label>
                      Credit Card Number:{" "}
                      <input
                        disabled
                        placeholder="disabled for demo"
                        value={billCardNumber}
                        onChange={(e) => {
                          setBillCardNumber(e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </label>
                    <label>
                      Credit Card CVV*:{" "}
                      <input
                        value={billCVV}
                        required
                        onChange={(e) => {
                          setBillCVV(e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </label>
                    <label>
                      Credit Card Expiration*:{" "}
                      <input
                        type="date"
                        value={billExpiration}
                        required
                        onChange={(e) => {
                          setBillExpiration(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <button>Submit Order!</button>
              </form>
              <div>
                For demonstration purposes, your order form will be logged in
                the console.
              </div>
            </>
          )}{" "}
          {!grandTotal && (
            <button onClick={() => navigate("/")}>Keep Shopping!</button>
          )}
        </div>
      )}
      {submitted && (
        <div className="check-out">
          <h2>Thank you, {billName}!</h2>
          <div>Your order has been submitted.</div>
          <div>It will be processed and shipped to:</div>
          <div className="address-container">
            <div>{sendName}</div>
            <div>{sendAddress}</div>
          </div>
          <div>
            For demonstration purposes, your order form has been logged in the
            console.
          </div>
          <button onClick={() => navigate("/")}>Keep Shopping!</button>
        </div>
      )}
    </>
  );
}
