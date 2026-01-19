import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Checkout.css";
import api from "../../api";
import axios from "axios";

import { FaMapMarkerAlt, FaOpencart, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { MdOutlineHomeWork, MdLocationPin } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { TbMapPin } from "react-icons/tb";

const BASE_URL = "http://127.0.0.1:8000";

const Checkout = () => {
  const navigate = useNavigate();
  const cart_code = localStorage.getItem("cart_code");

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch cart items
  useEffect(() => {
    if (!cart_code) return;
    api
      .get(`get_cart?cart_code=${cart_code}`)
      .then((res) => setCartItems(res.data.items || []))
      .catch(() => setErrorMessage("Failed to fetch cart items"));
  }, [cart_code]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const DELIVERY_CHARGE = 170;
  const total = subtotal + DELIVERY_CHARGE;

  // ---------------- Razorpay Payment ----------------
  const handlePayment = async () => {
    setErrorMessage("");

    if (!address || !phone || !fullName || !pincode || !city || !state) {
      setErrorMessage("⚠️ Please fill all shipping fields");
      return;
    }

    try {
      // ✅ Step 1: Order create backend se
      const { data: order } = await axios.post("http://127.0.0.1:8000/create-order/", {
        amount: total,
        cart_code,
      });

      if (!order || !order.order_id) {
        setErrorMessage("❌ Order creation failed.");
        return;
      }

      // ✅ Step 2: Razorpay options
      const options = {
        key: order.key, // backend se mila key_id
        amount: order.amount,
        currency: order.currency,
        name: "Dev Outlet",
        description: "Order Payment",
        order_id: order.order_id,
        handler: async function (response) {
          try {
            // ✅ Step 3: Verify payment
            const res = await axios.post("http://127.0.0.1:8000/verify-payment/", {
              ...response,
              cart_code,
              address,
              phone,
              full_name: fullName,
              landmark,
              pincode,
              city,
              state,
            });

            if (res.data.status === "success") {
              navigate("/success"); // ✅ Success page
            } else {
              setErrorMessage("❌ Payment verification failed. Please try again.");
            }
          } catch {
            setErrorMessage("❌ Payment verification error.");
          }
        },
        prefill: {
          name: fullName,
          email: "test@example.com",
          contact: phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMessage("❌ Payment initialization error. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title" style={{ backgroundColor: "#2222" }}>
        <FaOpencart color="red" /> Checkout
      </h1>

      {/* ✅ Error Box */}
      {errorMessage && (
        <div
          style={{
            background: "#ffdddd",
            padding: "10px",
            color: "red",
            marginBottom: "15px",
            borderRadius: "6px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <div className="checkout-grid">
        {/* Shipping Form */}
        <div className="checkout-card">
          <h2>Shipping Details</h2>
          <label><FaUserAlt color="orange" size={20}/> Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label><MdOutlineHomeWork color="orange" size={20}/> Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

          <label><MdLocationPin color="#8888" size={26}/> Landmark (Optional)</label>
          <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} />

          <label><TbMapPin color="#7777" size={20}/> Pin Code</label>
          <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />

          <label><GiModernCity color="orange" size={20}/> City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

          <label><FaMapMarkerAlt color="#9999" size={20}/> State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />

          <label><FaPhoneAlt color="green" size={20}/> Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {/* Order Summary */}
        <div className="checkout-card summary-card">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img
                  src={item.product.image ? `${BASE_URL}${item.product.image}` : "https://via.placeholder.com/50"}
                  alt={item.product.name}
                />
                <div>
                  <p>{item.product.name}</p>
                  <small>Qty: {item.quantity}</small>
                </div>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr />
          <p>Subtotal: <b>₹{subtotal}</b></p>
          <p>Delivery: <b>₹{DELIVERY_CHARGE}</b></p>
          <h3>Total: ₹{total}</h3>

          <button className="place-order-btn" onClick={handlePayment}>
            <SiNike /> Pay ₹{total}
          </button>

          <Link to="/cart">
            <button className="back-btn">← Back to Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
