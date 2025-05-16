import { useContext } from "react";
import { useParams } from "react-router-dom";
import { productContext } from "../context/products";
import "../css/clothes.css";
import { useState } from "react";

export default function Clothes() {
  const { id } = useParams();
  const products = useContext(productContext);
  const [buyCount , setbuyCount] = useState(1) ;

  const product = products.find(p => p.id === parseInt(id));

  if (!products || products.length === 0) {
    return (
      <div className="clothes">
        <div className="clothes__container">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="clothes">
        <div className="clothes__container">
          <h2>Product Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="clothes">
      <div className="clothes__container">
        <div className="clothes__image-container">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="clothes__image"
          />
        </div>
        
        <div className="clothes__content">
          <h1 className="clothes__title">{product.title}</h1>
          <p className="clothes__price">₹{product.price}</p>
          
          <p className="clothes__description">
            {product.description || "Experience the perfect blend of style and comfort with this premium product. Crafted with attention to detail and using high-quality materials, this piece is designed to elevate your wardrobe."}
          </p>
          
          <div className="clothes__actions">
            <button className="clothes__button clothes__button--primary">
              Add to Cart
            </button>
            <button className="clothes__button clothes__button--secondary">
              Add to Wishlist
            </button>
          </div>
          
          <div className="clothes__details">
            <h3 className="clothes__details-title">Product Details</h3>
            <ul className="clothes__details-list">
              <li className="clothes__details-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium Quality Material
              </li>
              <li className="clothes__details-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </li>
              <li className="clothes__details-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Easy Returns
              </li>
              <li className="clothes__details-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Authentic
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
