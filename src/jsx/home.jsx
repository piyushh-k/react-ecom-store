import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const ProductErrors = useSelector((state) => state.products.ProductErrors);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "failed") {
    return <p>some error occured : {ProductErrors}</p>;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="home-hero">
        <span className="home-hero__subtitle">Summer Collection</span>
        <h1 className="home-hero__title">
          Introducing New
          <br />
          Arrivals
        </h1>
        <p className="home-hero__desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <button className="home-hero__btn" onClick={scrollToTop}>
          View Collection
        </button>
      </div>
      <div className="home-collections-grid">
        <div
          className="collection-card collection-card--large"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/11/5e/00/115e00ba95170fb252db310d725567a5.jpg')",
          }}
        >
          <div className="collection-card__overlay">
            <div>
              <span className="collection-card__title">Summer Collection</span>
              <div className="collection-card__desc">
                Bright styles for the new season
              </div>
            </div>
          </div>
        </div>
        <div className="home-collections-right">
          <div className="collection-card-row">
            <div
              className="collection-card collection-card--small"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80')",
              }}
            >
              <div className="collection-card__overlay">
                <div>
                  <span className="collection-card__title">
                    Men's Collection
                  </span>
                  <div className="collection-card__desc">
                    Trendy picks for him
                  </div>
                </div>
              </div>
            </div>
            <div
              className="collection-card collection-card--small"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80')",
              }}
            >
              <div className="collection-card__overlay">
                <div>
                  <span className="collection-card__title">
                    Women's Collection
                  </span>
                  <div className="collection-card__desc">
                    Fresh arrivals for her
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="collection-card collection-card--wide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80')",
            }}
          >
            <div className="collection-card__overlay">
              <div>
                <span className="collection-card__shipping">Free Shipping</span>
                <div className="collection-card__shipping-sub">
                  On All Orders Above $299
                </div>
                <div className="collection-card__desc">
                  Shop now and enjoy fast, free delivery on your favorite
                  styles.
                </div>
                <button className="collection-card__btn" onClick={scrollToTop}>
                  View Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="featured-products">
          <h2 className="featured-products__title">Featured Products</h2>
          <div className="featured-products__grid">
            {products.slice(1, 11).map((product) => (
              <Link
                to={`product/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <div className="product-card__image-container">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-card__image"
                  />
                </div>
                <div className="product-card__content">
                  <h3 className="product-card__title">{product.title}</h3>
                  <p className="product-card__price">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
