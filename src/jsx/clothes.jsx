import { useParams } from "react-router-dom";
import { useState, useEffect, act } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import "../css/clothes.css";
import { useForm } from "react-hook-form";

export default function Clothes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const errors = useSelector((state) => state.products.error);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [rating , setRating] = useState(0); 

  //check git

  const {
    register,
    handleSubmit,
    watch,
    formState: { formErrors },
  } = useForm();

  const onFormSubmit = (data) => {
    console.log(data.review);
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
    return <div className="clothes__error">Some error occured : {errors}</div>;
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
    content = <form onSubmit={handleSubmit(onFormSubmit)}>
      <p>Be the first to review “Anchor Bracelet” </p>
      {[1 , 2 , 3 , 4 ,5].map((star) => (
        <span key={star} onClick={() => {setRating(star)}} style={{cursor: "pointer",color: star <= rating ? "gold" : "gray",fontSize: "2rem",}}>
          ⭐️ 
        </span>
      ))}
      <input defaultValue={'write review'} {...register("review")} />
      <input type="submit"/>
    </form>;
  }

  return (
    <div className="clothes">
      <div className="clothes__container">
        <h1 className="clothes__title">{product.title}</h1>

        <div className="clothes__image-container">
          <img
            src={product.images[0]}
            alt={product.title}
            className="clothes__image"
          />
        </div>

        <div className="clothes__details">
          <p className="clothes__price">Rs. {product.price.toLocaleString()}</p>

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
            <button className="clothes__button--primary">Add to Cart</button>
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
