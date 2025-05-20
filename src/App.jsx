import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./jsx/home";
import Aboutus from "./jsx/aboutus";
import Shop from "./jsx/shop";
import ContactUs from "./jsx/contactUs";
import Layout from "./jsx/layout";
import Cart from "./jsx/cart";
import Clothes from "./jsx/clothes";


function App() {
  return (
    <>
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
        
    </>
  );
}

export default App;
