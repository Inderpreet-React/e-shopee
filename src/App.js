import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ShoopingCart from "./components/ShoopingCart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/products/:productId" element={<ProductDetails />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/cart" element={<ShoopingCart />} />
			<Route path="/wishlist" element={<Wishlist />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
