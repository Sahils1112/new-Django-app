import React from 'react';
import { BASE_URL } from '../api';
// import './HomeCard.css';
import { Link } from 'react-router-dom';
import api from '../api';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeCard = ({ id, title, description, price, image, slug }) => {
  const dummyImage = "https://via.placeholder.com/300x200.png?text=Dummy+Image";
  const cart_code = localStorage.getItem("cart_code");

  function addToCart(e) {
    e.preventDefault(); // Prevent link navigation
    const newItem = { cart_code, product_id: id };
    api.post("add_item/", newItem)
      .then(res => {res.data
        toast.success("Cart item added successfully")})
      .catch(err => console.error(err.message));
  }

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <Link to={`/product/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card h-100 shadow-sm home-card">
          <div className="card-image-container">
            <img
              src={image ? `${BASE_URL}${image}` : dummyImage}
              className="card-img-top"
              alt={title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text flex-grow-1 text-truncate">{description}</p>
            <p className="fw-bold text-success">₹ {price}</p>
            <div>
              <button className="btn btn-success me-2">Buy</button>
              <button onClick={addToCart} className="btn btn-warning">Add to cart</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
