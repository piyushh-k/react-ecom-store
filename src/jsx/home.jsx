import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css"; // Import the CSS file

export default function Home() {

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
              "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80')",
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
    </>
  );
}
