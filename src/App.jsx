// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
