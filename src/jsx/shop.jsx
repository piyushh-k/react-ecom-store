import {useContext} from 'react';
import { productContext } from '../context/products';
import { Link } from 'react-router-dom';
import '../css/shop.css';

export default function Shop() {
  const products = useContext(productContext);

  if(products.length === 0){
    return(
      <div className="shop-loading">
        <h2>Loading products...</h2>
      </div>
    )
  }
  
  return(
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Our Collection</h1>
        <p className="shop__subtitle">Discover our latest products</p>
      </div>
      
      <div className="shop__grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="shop__product-card">
            <div className="shop__product-image-container">
              <img src={product.images[0]} alt={product.title} className="shop__product-image" />
            </div>
            <div className="shop__product-content">
              <h3 className="shop__product-title">{product.title}</h3>
              <p className="shop__product-price">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
