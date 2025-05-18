import { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/shop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { useEffect } from "react";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const errors = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error : {errors}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.images[0]} />
          <h3>{product.title}</h3>
          <p>Rs {product.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
