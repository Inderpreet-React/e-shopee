import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ShoopingCart from "./pages/ShoopingCart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { loginUser, logoutUser } from "./store/user";
import { updateWishlist } from "./store/wishlist";
import { updateCart, updateTotal } from "./store/cart";

function App() {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const userUid = useSelector((state) => state.user.userUid);
	const cartTotal = useSelector((state) => state.cart.cartTotal);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userName = user.displayName;
				const uid = user.uid;
				const email = user.email;
				dispatch(
					loginUser({
						userName,
						email,
						uid,
					})
				);
			} else {
				dispatch(logoutUser());
			}
		});

		return unsub;
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			return onSnapshot(doc(db, "users", userUid), (doc) => {
				if (doc.exists()) {
					dispatch(updateWishlist(doc.data().userWishlist));
					dispatch(updateCart(doc.data().userCart));
					dispatch(updateTotal(doc.data().cartTotal));
				} else {
					console.log("There was some error fetching the data");
				}
			});
		} else {
			dispatch(updateWishlist([]));
			dispatch(updateCart([]));
		}
	}, [isAuthenticated]);

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
