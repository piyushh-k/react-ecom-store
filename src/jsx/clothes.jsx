import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import "../css/clothes.css";
import { useForm } from "react-hook-form";
import { addToCart } from "../features/cart/cartSlice";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export default function Clothes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const ProductErrors = useSelector((state) => state.products.error);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("form");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          rating: rating,
          review: data.review,
          product: product.title,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      alert("Thanks for your review!");
      setRating(0);
      reset();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert("Error while submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const increaseCount = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="clothes__loading">Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="clothes__error">Some error occurred: {ProductErrors}</div>
    );
  }

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="clothes__error">Product not found.</div>;
  }

  let content;
  if (activeTab === "description" || product.length > 0) {
    content = product.description;
  } else if (activeTab === "info") {
    content = product.title;
  } else if (activeTab === "form") {
    content = (
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="clothes__review-form"
        noValidate
      >
        <p>Be the first to review {product.title}</p>
        <p>Your Rating: </p>
        <div className="clothes__rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => {
                setRating(star);
              }}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "2rem",
              }}
            >
              *
            </span>
          ))}
        </div>
        <div className="clothes__form-group">
          <h6>Write your review here:</h6>
          <textarea
            {...register("review", {
              required: "Review is required",
              minLength: {
                value: 10,
                message: "Review must be at least 10 characters long"
              }
            })}
            rows="4"
            placeholder="Write your review here..."
          />
          {errors.review && (
            <p className="clothes__error-message">{errors.review.message}</p>
          )}
        </div>
        <div className="clothes__form-group">
          <h6>Name*:</h6>
          <input
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long"
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Name can only contain letters and spaces"
              }
            })}
            type="text"
          />
          {errors.name && (
            <p className="clothes__error-message">{errors.name.message}</p>
          )}
        </div>
        <div className="clothes__form-group">
          <h6>Email*:</h6>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="clothes__error-message">{errors.email.message}</p>
          )}
        </div>
        <button 
          type="submit" 
          className="clothes__submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    );
  }

  const addInCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: product.price,
        quantity: quantity,
        title: product.title,
        image: product.image,
      })
    );
    alert(`${product.title} was added to cart`);
  };

  return (
    <div className="clothes">
      <div className="clothes__container">
        <h1 className="clothes__title">{product.title}</h1>

        <div className="clothes__image-container">
          <img
            src={product.image}
            alt={product.title}
            className="clothes__image"
          />
        </div>

        <div className="clothes__details">
          <p className="clothes__price"> $ {product.price.toLocaleString()}</p>

          <div className="clothes__purchase-controls">
            <div className="clothes__quantity-controls">
              <button className="clothes__button" onClick={decreaseCount}>
                -
              </button>
              <div className="clothes__quantity">{quantity}</div>
              <button className="clothes__button" onClick={increaseCount}>
                +
              </button>
            </div>
            <button className="clothes__button--primary" onClick={addInCart}>
              Add to Cart
            </button>
          </div>

          <div className="clothes__tabs-section">
            <div className="clothes__tabs">
              <button
                className={`clothes__tab ${
                  activeTab === "description" ? "clothes__tab--active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`clothes__tab ${
                  activeTab === "info" ? "clothes__tab--active" : ""
                }`}
                onClick={() => setActiveTab("info")}
              >
                Additional Info
              </button>
              <button
                className={`clothes__tab ${
                  activeTab === "form" ? "clothes__tab--active" : ""
                }`}
                onClick={() => setActiveTab("form")}
              >
                Reviews
              </button>
            </div>
            <div className="clothes__content">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
