import { useSelector , useDispatch } from "react-redux";
import "../css/cartSideBar.css";
import { removeFromCart } from "../features/cart/cartSlice";

export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

    const removeItem = (id , title) => {
    dispatch(
      removeFromCart({
        id: id,
      })
    );
    alert(`${title} was removed from the cart.`);
  };

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? "cart-sidebar--open" : ""}`}>
        <div className="cart-sidebar__header">
          <h2>Your Cart</h2>
          <button className="cart-sidebar__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-sidebar__items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-sidebar__item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-sidebar__item-image"
              />
              <div className="cart-sidebar__item-details">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>${item.total}</p>
                <button onClick={() => removeItem(item.id , item.title)}>❌</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-sidebar__footer">
          <div className="cart-sidebar__total">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          <button className="cart-sidebar__checkout">Checkout</button>
        </div>
      </div>

      {isOpen && <div className="cart-sidebar__overlay" onClick={onClose} />}
    </>
  );
}
