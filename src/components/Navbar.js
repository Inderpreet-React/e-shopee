import React from "react";
import {
	UserIcon,
	ArrowRightOnRectangleIcon,
	ShoppingBagIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/user";

export default function Navbar() {
	const currentUser = useSelector((state) => state.user.isAuthenticated);
	const cartItems = useSelector((state) => state.cart.cartItem);
	const wishlistItems = useSelector((state) => state.wishlist.wishlistItem);
	const dispatch = useDispatch();

	function logoutHandler() {
		signOut(auth)
			.then(dispatch(logoutUser()))
			.catch((e) => console.log(e, "some error happened"));
	}

	return (
		<div className="items-center z-20 fixed top-0 left-0 w-full h-12 justify-between flex pl-4 pr-4 md:pr-10 py-2 bg-indigo-500">
			<Link to="/" className="font-semibold text-white text-2xl">
				E-Shopee
			</Link>
			<div className="flex gap-4">
				{!currentUser ? (
					<div className=" relative group">
						<Link to="/login">
							<UserIcon className="text-white h-7 w-7" />
						</Link>
						<div className="absolute top-[110%] -left-2 font-bold text-gray-900 group-hover:opacity-100 opacity-0">
							Login
						</div>
					</div>
				) : (
					<div className=" relative group">
						<ArrowRightOnRectangleIcon
							onClick={logoutHandler}
							className="text-white h-7 w-7 hover:text-gray-200 cursor-pointer"
						/>
						<div className="absolute top-[110%] -left-3 font-bold text-gray-900 group-hover:opacity-100 opacity-0">
							Logout
						</div>
					</div>
				)}
				{currentUser ? (
					<>
						<div className="relative group">
							<Link to="/wishlist" className="relative group">
								<HeartIcon className="text-white h-7 w-7 hover:text-gray-200" />
							</Link>
							<div className="absolute top-[110%] -left-4 font-bold text-gray-900 group-hover:opacity-100 opacity-0">
								Wishlist
							</div>
							{Object.keys(wishlistItems).length > 0 ? (
								<div className="absolute left-[70%] top-[60%] text-white flex items-center justify-center font-bold rounded-full w-5 h-5 border-2 border-white">
									{Object.keys(wishlistItems).length}
								</div>
							) : null}
						</div>
						<div className="relative group">
							<Link to="/cart">
								<ShoppingBagIcon className="text-white relative h-7 w-7 hover:text-gray-200" />
							</Link>
							<div className="absolute top-[110%] -left-1 font-bold text-gray-900 group-hover:opacity-100 opacity-0">
								Cart
							</div>
							{Object.keys(cartItems).length > 0 ? (
								<div className="absolute left-[90%] top-[60%] text-white flex items-center justify-center font-bold rounded-full w-5 h-5 border-2 border-white">
									{Object.keys(cartItems).length}
								</div>
							) : null}
						</div>
					</>
				) : (
					""
				)}
			</div>
		</div>
	);
}
