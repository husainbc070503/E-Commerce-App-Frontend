import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Products from "./Components/Products/Products";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Cart from "./Components/Cart/Cart";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Authentication/Login";
import Index from "./Components/Index";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./Contexts/UserContext";
import { ToastContainer, Zoom } from "react-toastify";
import UpdateProfile from "./Components/Authentication/UpdateProfile";

function App() {
  const loadScript = (url) => {
    return new Promise(async (resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => resolve(true);
      script.onerror = () => reject(false);

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/magic-checkout.js")
      .then((data) => console.log("File uploaded successfully.", data))
      .catch((err) => console.log("Failed to append file", err));
  });

  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />}>
            <Route path="/" element={<Home />} index />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/singleProduct/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </UserContext>
      <ToastContainer transition={Zoom} />
    </BrowserRouter>
  );
}

export default App;
