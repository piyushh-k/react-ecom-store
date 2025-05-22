import { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/shop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { useEffect } from "react";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const errors = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="shop-loading">
        <h2>Loading products...</h2>
      </div>
    );
  }
  
  if (status === "failed") {
    return (
      <div className="shop-loading">
        <h2>Error Occured : {errors || 'Something went wrong'}</h2>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Our Collection</h1>
        <p className="shop__subtitle">Discover our carefully curated selection of products</p>
      </div>
      
      <div className="shop__grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} className="shop__product-card" key={product.id}>
              <div className="shop__product-image-container">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="shop__product-image"
                />
              </div>
              <div className="shop__product-content">
                <h3 className="shop__product-title">{product.title}</h3>
                <p className="shop__product-price">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="shop-loading">
            <h2>No products available</h2>
          </div>
        )}
      </div>
    </div>
  );
}
