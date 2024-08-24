import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home"; // Assuming you have a Home component
import WomenProducts from "./screens/WomenProducts"; // Assuming you have a component for women's products
import MenProducts from "./screens/MenProducts"; // Assuming you have a component for men's products
import KidsProducts from "./screens/KidsProducts"; // Assuming you have a component for kid's products
import AccessoriesProducts from "./screens/AccessoriesProducts"; // Assuming you have a component for accessories
import CosmeticsProducts from "./screens/CosmeticsProducts"; // Assuming you have a component for cosmetics
import Details from "./screens/Details"; // Assuming you have a component for cosmetics
import CartDetails from "./screens/cartedItems"; // Assuming you have a component for cosmetics
import ProceedToPayment from "./screens/proceedToPayment";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/women" element={<WomenProducts />} />
        <Route path="/men" element={<MenProducts />} />
        <Route path="/kids" element={<KidsProducts />} />
        <Route path="/accessories" element={<AccessoriesProducts />} />
        <Route path="/cosmetics" element={<CosmeticsProducts />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/payment" element={<ProceedToPayment />} />
      </Route>
    </Routes>
  );
}

export default App;
