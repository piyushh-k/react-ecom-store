import { Link, Outlet } from 'react-router-dom';
import '../css/layout.css';
import logo from '../assets/ecom.png'; // Place your image in src/assets/logo.png

export default function Layout() {
    return (
        <div className="layout">
            <nav className="navbar">
                <div className="navbar__container">
                    <Link to="/" className="navbar__logo">
                        <img src={logo} alt="Logo" className="navbar__logo-img" />
                    </Link>
                    <div className="navbar__links">
                        <Link to="/" className="navbar__link">Home</Link>
                        <Link to="/shop" className="navbar__link">Shop</Link>
                        <Link to="/aboutUs" className="navbar__link">About</Link>
                        <Link to="/contactUs" className="navbar__link">Contact</Link>
                        <Link to="/cart" className="navbar__link navbar__link--cart">
                            Cart
                            <span className="navbar__cart-count">0</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}