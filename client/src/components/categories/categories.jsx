import React from 'react';
import './styles.css';
import { MdComputer } from 'react-icons/md';
import { GiBookCover } from 'react-icons/gi'; // Correct import for GiBookCover
import { IoFastFoodOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { SiApachecloudstack } from "react-icons/si";
import { Link } from 'react-router-dom';


const Categories = () => (
  <div className="category-container">

    <Link to="/product" className="category-card">
      <MdComputer size={60} />
      <span className="category-label">Electronics</span>
    </Link>
    {/* <Link to="#" className="category-card">
      <IoFastFoodOutline  size={60} />
      <span className="category-label">Food</span>
    </Link> */}
    <Link to="/product" className="category-card">
      <GiClothes size={60} />
      <span className="category-label">Clothings</span>
    </Link>
    <Link to="/product" className="category-card">
      <SiApachecloudstack size={60} />
      <span className="category-label">Toys</span>
    </Link>
    <Link to="/product" className="category-card">
      <GiBookCover size={60} />
      <span className="category-label">Book</span>
    </Link>
    
  </div>
);

export default Categories;
