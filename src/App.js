import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ShoopingCart from "./components/ShoopingCart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import { onSnapshot, query, doc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { loginUser, logoutUser } from "./store/user";
import { updateWishlist } from "./store/wishlist";

function App() {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const currentUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			// console.log("auth observer ran");
			if (user) {
				// console.log(user.uid);
				dispatch(loginUser(user));
			} else {
				dispatch(logoutUser());
			}
		});

		return unsub;
	}, []);

	useEffect(() => {
		const unsub = () => {
			if (isAuthenticated) {
				// console.log("uid", currentUser.payload.uid);
				const q = doc(db, "users", currentUser.payload.uid);
				onSnapshot(q, (doc) => {
					if (doc.exists()) {
						console.log("wishlist useEffect ran");
						dispatch(updateWishlist(doc.data().userWishlist));
					} else {
						console.log("There was some error fetching the data");
					}
				});
			} else {
				dispatch(updateWishlist({}));
			}
		};
		return () => {
			unsub();
		};
	}, []);

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
