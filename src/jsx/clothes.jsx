import { useParams } from "react-router-dom";
import "../css/clothes.css";
import { useState } from "react";

export default function Clothes() {
  const { id } = useParams();
  const [buyCount, setbuyCount] = useState(1);

  return (
    <>
      <h1>this is cloth of id {id}</h1>
    </>
  );
}
