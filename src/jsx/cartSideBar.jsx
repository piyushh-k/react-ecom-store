import { useSelector, useDispatch } from "react-redux";
import "../css/cartSideBar.css";
import {
  removeFromCart,
  increaseInCart,
  decreaseInCart,
  clearCart
} from "../features/cart/cartSlice";

export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const removeItem = (id, title) => {
    dispatch(
      removeFromCart({
        id: id,
      })
    );
    alert(`${title} was removed from the cart.`);
  };

  const handleIncrease = (id) => {
    dispatch(
      increaseInCart({
        id: id,
      })
    );
  };

  const handleDecrease = (id) => {
    dispatch(
      decreaseInCart({
        id: id,
      })
    );
  };

  const handleClear = () => {
    dispatch(clearCart())
  }

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? "cart-sidebar--open" : ""}`}>
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">Your Cart</h2>
          <button className="cart-sidebar__close" onClick={onClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-sidebar__items">
          {cartItems.length === 0 ? (
            <div className="cart-sidebar__empty-message">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-sidebar__item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-sidebar__item-image"
                />
                <div className="cart-sidebar__item-details">
                  <h3 className="cart-sidebar__item-title">{item.title}</h3>
                  <p className="cart-sidebar__item-quantity">Quantity: {item.quantity}</p>
                  <p className="cart-sidebar__item-price">${item.total}</p>
                  <div className="cart-sidebar__item-actions">
                    <button className="cart-sidebar__item-remove" onClick={() => removeItem(item.id, item.title)} aria-label={`Remove ${item.title}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="cart-sidebar__item-increase" onClick={() => handleIncrease(item.id)} aria-label="Increase quantity">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="cart-sidebar__item-decrease" onClick={() => handleDecrease(item.id)} aria-label="Decrease quantity">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-sidebar__footer">
          <div className="cart-sidebar__total">
            <span className="cart-sidebar__total-label">Total:</span>
            <span className="cart-sidebar__total-price">${totalPrice}</span>
          </div>
          <button className="cart-sidebar__checkout" disabled={cartItems.length === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cart-sidebar__checkout-icon">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Checkout
          </button>
          <button className="cart-sidebar__clear-cart" onClick={handleClear} disabled={cartItems.length === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cart-sidebar__clear-icon">
              <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear Cart
          </button>
        </div>
      </div>

      {isOpen && <div className="cart-sidebar__overlay" onClick={onClose} />}
    </>
  );
}
