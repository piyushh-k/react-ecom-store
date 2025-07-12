import { Link, Outlet } from "react-router-dom";
import "../css/layout.css";
import logo from "../assets/ecom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import CartSidebar from "./cartSideBar";
import { useSelector } from 'react-redux';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <div className="layout">    
    <nav>
      <Link onClick={(e) => {e.preventDefault();
        setIsCartOpen(true);
      }}>
        Cart
      </Link>
    </nav>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to="/" className="navbar__logo" reloadDocument>
            <img src={logo} alt="Logo" className="navbar__logo-img" />
          </Link>
          <div className="navbar__links">
            <Link to="/" className="navbar__link">
              Home
            </Link>
            <Link to="/shop" className="navbar__link">
              Shop
            </Link>
          
            <Link to="/contactUs" className="navbar__link">
              Contact
            </Link>
            <Link 
              to="#" 
              className="navbar__link navbar__link--cart"
              onClick={(e) => {
                e.preventDefault();
                setIsCartOpen(true);
              }}
            >
              Cart
              <span className="navbar__cart-count">{cartQuantity}</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__section footer__section--copyright">
            <p className="footer__copyright">
              &copy; 2024 Your Store. All rights reserved.
            </p>
          </div>

          <div className="footer__section footer__section--links">
            <h4 className="footer__title">Quick links</h4>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to="/" className="footer__link">
                  Home
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/shop" className="footer__link">
                  Shop
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/aboutUs" className="footer__link">
                  About us
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/contactUs" className="footer__link">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__section footer__section--social">
            <h4 className="footer__title">Connect with us</h4>
            <div className="footer__social-links">
              <Link
                to="https://www.linkedin.com/in/piyush-kochar-6b812b262/"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="footer__social-icon"
                />
                <span className="footer__social-text">LinkedIn</span>
              </Link>
              <Link
                to="https://x.com/PiyushKoch7896"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="footer__social-icon"
                />
                <span className="footer__social-text">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
