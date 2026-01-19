import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// import banner from '../../images/aniket.jpg';
import banner from '../../images/123456.jpg' 
import { GiChainedArrowHeads } from "react-icons/gi";


const Header = () => {
  return (
    <div className="header-wrapper" >
      <div className="header-image-container" >
        <img src={banner} alt="Banner" className="header-image" />
        <div className="header-overlay" >
          <h1 className="hero-title" >Deals You Can't Miss!</h1>
          <p className="hero-subtitle">
            Your one-stop shop for the latest trends
          </p>
          <Link className="btn btn-warning btn-lg mt-3" to="/product">
            Shop Now
          </Link>
        </div>
        <div>
           <h2 className="text-center">Featured Products</h2>
          <h2 className="display-3 fw-bold" style={{ color: "gray", textAlign:"center", fontSize:60}}><span className="text-warning">Welcome to </span>
           Fashion Store
        </h2>
      <p className="text-center mb-4">
          <GiChainedArrowHeads color='red'/>&nbsp;&nbsp;&nbsp;
                Explore our exclusive range of top-quality products carefully selected for you.
          &nbsp;&nbsp;&nbsp;<GiChainedArrowHeads color='red'/>
              </p>
      </div>

        </div>
    </div>
  );
};

export default Header;
