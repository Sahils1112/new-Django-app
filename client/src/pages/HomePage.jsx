import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import HomeCard from "./HomeCard";
import PlaceHolderContainer from "../pages/placeHolderContainer";
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ensure cart_code exists
  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      const randomValue = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get("products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: 40 }}>
        {loading ? (
          <PlaceHolderContainer />
        ) : (
          <div className="row">
            {products.map((product, index) => (
              <HomeCard
                key={index}
                id={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                slug={product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
