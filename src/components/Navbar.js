import React from "react";
import {
	UserIcon,
	ArrowRightOnRectangleIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
	const currentUser = true;

	return (
		<div className="items-center justify-between flex pl-4 pr-4 md:pr-10 py-2 h-full bg-indigo-500">
			<h1 className="font-semibold text-white text-2xl">E-Shopee</h1>
			<div className="flex gap-4">
				{currentUser ? (
					<Link to="/login">
						<UserIcon className="text-white h-7 w-7" />
					</Link>
				) : (
					<ArrowRightOnRectangleIcon className="text-white h-7 w-7 hover:text-gray-200" />
				)}
				<Link to="/cart">
					<ShoppingBagIcon className="text-white h-7 w-7 hover:text-gray-200" />
				</Link>
			</div>
		</div>
	);
}
