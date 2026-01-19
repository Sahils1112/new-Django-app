import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
import RelatedProducts from './RelatedProducts';
import api, { BASE_URL } from '../api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);

  const cart_code = localStorage.getItem("cart_code");

  const dummyImage = "https://via.placeholder.com/300x200.png?text=No+Image";


  // Ensure cart_code exists
  useEffect(() => {
    if (!cart_code) {
      const randomValue = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("cart_code", randomValue);
      console.log("Generated new cart_code:", randomValue);
    } else {
      console.log("Existing cart_code:", cart_code);
    }
  }, [cart_code]);

  function add_item() {
    const newItem = { cart_code: localStorage.getItem("cart_code"), product_id: product.id };
    console.log("Adding item to cart:", newItem);

    api.post("add_item/", newItem)
      .then(res => {
        console.log("Add to Cart API Response:", res.data);
        // alert(res.data.message);
                toast.success("Cart item added successfully")

        setInCart(true);
        setNumberCartItems(curr => curr + 1)
      })
      .catch(err => {
        console.error("Error adding item:", err.message);
      });
  }

  // Check if product is already in cart
  useEffect(() => {
    if (product.id) {
      console.log(`Checking if product ${product.id} is in cart ${cart_code}...`);
      api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res => {
          console.log("Product in cart API Response:", res.data);
          setInCart(res.data.product_in_cart);
        })
        .catch(err => console.log("Error checking cart:", err.message));
    }
  }, [cart_code, product.id]);



  useEffect(() => {
    setLoading(true);
    console.log(`Fetching product details for slug: ${slug}`);
    api.get(`product_detail/${slug}`)
      .then(res => {
        console.log("Product details API Response:", res.data);
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching product:", err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <ProductPagePlaceHolder />;
  }

  return (
    <>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={product.image ? `${BASE_URL}${product.image}` : dummyImage}
                alt={product.name || "Product Image"}
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">SKU : BST-498</div>
              <h1 className="display-5 fw-bold">{product.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through text-muted me-2">₹ 99.99</span>
                <span className="fw-bold text-success">{`₹ ${product.price}`}</span>
              </div>
              <p>{product.description}</p>
              <div className="d-flex">
                <button
                  onClick={add_item}
                  disabled={inCart}
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i className="bi-cart-fill me-1"></i>
                  {inCart ? "Product added to cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts products={similarProducts} />
    </>
  );
};

export default ProductPage;
