import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

export default function Clotehs() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const errors = useSelector((state) => state.products.error);
  const [quantity, setQuantity] = useState(1);


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

  const product = products.find((item) => item.id == parseInt(id));

  if (status === "loading" || !product) {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Some error occured {errors}</div>;
  } else {
    return (
      <>
        <h1>this is the cloth of id {id}</h1>
        <img src={product.images[0]} alt={product.title} />
        <div>{quantity}</div>
        <button onClick={increaseCount}>+</button>
        <button onClick={decreaseCount}>-</button>
        <p>{product.description}</p>
        <br />
        <br />
      </>
    );
  }
}
