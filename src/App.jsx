import "./App.css";
import { Routes, Route , Outlet} from "react-router-dom";
import Home from "./jsx/home";
import Shop from "./jsx/shop";
import ContactUs from "./jsx/contactUs";
import Layout from "./jsx/layout";
import Cart from "./jsx/cart";
import Clothes from "./jsx/clothes";
import ViewCart from "./jsx/ViewCart";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="shop">
            <Route index element={<Shop/>}/>
            <Route path="viewcart" element={<ViewCart />} />
          </Route>
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Clothes />} />
          <Route path="/checkout" element={<ViewCart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
