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
					<Link to="/login">
						<UserIcon className="text-white h-7 w-7" />
					</Link>
				) : (
					<ArrowRightOnRectangleIcon
						onClick={logoutHandler}
						className="text-white h-7 w-7 hover:text-gray-200 cursor-pointer"
					/>
				)}
				{currentUser ? (
					<>
						<Link to="/wishlist">
							<HeartIcon className="text-white h-7 w-7 hover:text-gray-200" />
						</Link>
						<Link to="/cart">
							<ShoppingBagIcon className="text-white h-7 w-7 hover:text-gray-200" />
						</Link>
					</>
				) : (
					""
				)}
			</div>
		</div>
	);
}
