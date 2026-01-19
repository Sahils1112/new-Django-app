import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import api from '../../api';
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://127.0.0.1:8000";
const dummyImage = "https://via.placeholder.com/60";

const Cart = () => {
  const navigate = useNavigate();
  const cart_code = localStorage.getItem("cart_code");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cart_code) return;
    fetchCart();
  }, [cart_code]);

  const fetchCart = () => {
    api.get(`get_cart?cart_code=${cart_code}`)
      .then(res => {
        // toast.success("Cart item added successfully")
        setCartItems(res.data.items || []);
      })
      .catch(err => console.log(err.message));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    api.patch(`update_quantity/`, { item_id: itemId, quantity: newQuantity })
      .then(() => {
        setCartItems(prev =>
          prev.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
        toast.info("Cart item update successfully")
      })
      .catch(err => console.log(err.message));
  };

  const handleRemove = (itemId) => {
    api.delete(`remove_cart_item/${itemId}/`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
                toast.warning("Cart item remove successfully")

      })
      .catch(err => console.log(err.message));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <div className="cart-items">
        <h2>Your Cart</h2>
        <div className="cart-items-title">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {cartItems.length === 0 ? (
          <p style={{ padding: "20px" }}>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-items-item">
              <img
                src={item.product.image ? `${BASE_URL}${item.product.image}` : dummyImage}
                alt={item.product.name}
                width="60"
              />
              <p>{item.product.name}</p>
              <p>₹{item.product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <p>₹{item.product.price * item.quantity}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                <MdDeleteOutline size={22} color="#ff4d4f" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <div className="summary-details">
          <p>Subtotal: <b>₹{subtotal}</b></p>
          <p>Delivery: <b>₹170</b></p>
          <hr />
          <p>Total: <b>₹{subtotal + 170}</b></p>
        </div>
        <button onClick={() => navigate('/order/')} className="checkout-btn">
          Proceed to Checkout
        </button>
        <Link to="/">
          <button className="back-btn">← Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
