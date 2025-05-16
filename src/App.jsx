import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./jsx/home";
import Aboutus from "./jsx/aboutus";
import Shop from "./jsx/shop";
import ContactUs from "./jsx/contactUs";
import Layout from "./jsx/layout";
import Cart from "./jsx/cart";
import Clothes from "./jsx/clothes";
import { productContext } from "./context/products.js";
import { useEffect, useState } from "react";

function App() {

  const [products , setProducts] = useState([]);

  useEffect( () => {
    const fetchProducts =  async () => {
      try{
        const response = await fetch("https://api.escuelajs.co/api/v1/products")
        const data = await response.json();
        setProducts(data);
        console.log(data)
      }
      catch(error){
        console.log(error);
      }
    };
    fetchProducts();
  },[])

  return (
    <>
      <productContext.Provider value={products}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/aboutUs" element={<Aboutus />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Clothes />} />
          </Route>
        </Routes>
      </productContext.Provider>
    </>
  );
}

export default App;
