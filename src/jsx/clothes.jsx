import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import "../css/clothes.css";
import { useForm } from "react-hook-form";
import { addToCart } from "../features/cart/cartSlice";

export default function Clothes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const ProductErrors = useSelector((state) => state.products.error);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("form");
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    try {
      const response = await fetch("https://formspree.io/f/xrbqdobl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          rating: rating,
          review: data.review,
          product: product.title,
        }),
      });
      if (response.ok) {
        alert("Thanks for you review!");
        setRating(0);
        reset();
      } else {
        throw new Error("failed to submit form");
      }
    } catch (error) {
      alert("Error while submitting form. Please try again.");
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
    return <div className="clothes__loading">loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="clothes__error">Some error occured : {ProductErrors}</div>
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
        action="https://formspree.io/f/xrbqdobl"
        method="POST"
      >
        <p>Be the first to review {product.title}</p>
        <p>You Rating : </p>
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
            defaultValue={"write review"}
            {...register("review")}
            rows="4"
          />
        </div>
        <div className="clothes__form-group">
          <h6>Name*:</h6>
          <input
            placeholder="Name"
            {...register("name", {
              required: true,
              minLength: {
                value: 2,
                message: "name must be atleast 2 characters long.",
              },
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
              required: true,
              pattern: {
                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="email"
          />
          {errors.email && (
            <p className="clothes__error-message">{errors.email.message}</p>
          )}
        </div>
        <button type="submit" className="clothes__submit-button">
          Submit Review
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
        image: product.image
      })
    );
    alert(`${product.title} was added to cart`)
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
            <button className="clothes__button--primary" onClick={addInCart}>Add to Cart</button>
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
                Review Form
              </button>
            </div>
            <div className="clothes__content">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
