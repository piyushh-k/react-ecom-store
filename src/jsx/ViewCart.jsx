import "../css/checkout.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ViewCart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    card: "",
    expiry: "",
    cvc: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <h2>Thank you for your order!</h2>
        <p>Your payment was successful. A confirmation email has been sent to <b>{billing.email}</b>.</p>
        <div className="checkout-success__icon">✅</div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Details</h2>
          <div className="checkout-form-group">
            <label>Name</label>
            <input name="name" value={billing.name} onChange={handleChange} required placeholder="Full Name" />
          </div>
          <div className="checkout-form-group">
            <label>Email</label>
            <input name="email" type="email" value={billing.email} onChange={handleChange} required placeholder="Email Address" />
          </div>
          <div className="checkout-form-group">
            <label>Address</label>
            <input name="address" value={billing.address} onChange={handleChange} required placeholder="Street Address" />
          </div>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label>City</label>
              <input name="city" value={billing.city} onChange={handleChange} required placeholder="City" />
            </div>
            <div className="checkout-form-group">
              <label>ZIP</label>
              <input name="zip" value={billing.zip} onChange={handleChange} required placeholder="ZIP Code" />
            </div>
            <div className="checkout-form-group">
              <label>Country</label>
              <input name="country" value={billing.country} onChange={handleChange} required placeholder="Country" />
            </div>
          </div>
          <h2>Payment</h2>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label>Card Number</label>
              <input name="card" value={billing.card} onChange={handleChange} required placeholder="1234 5678 9012 3456" maxLength={19} />
            </div>
            <div className="checkout-form-group">
              <label>Expiry</label>
              <input name="expiry" value={billing.expiry} onChange={handleChange} required placeholder="MM/YY" maxLength={5} />
            </div>
            <div className="checkout-form-group">
              <label>CVC</label>
              <input name="cvc" value={billing.cvc} onChange={handleChange} required placeholder="CVC" maxLength={4} />
            </div>
          </div>
          <button className="checkout-btn" type="submit">Pay ${totalPrice}</button>
        </form>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="checkout-summary-list">
            {cartItems.map(item => (
              <li key={item.id} className="checkout-summary-item">
                <img src={item.image} alt={item.title} className="checkout-summary-img" />
                <div>
                  <div className="checkout-summary-title">{item.title}</div>
                  <div className="checkout-summary-qty">Qty: {item.quantity}</div>
                  <div className="checkout-summary-price">${item.total}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary-total">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
