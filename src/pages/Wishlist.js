import React from "react";
import PageWrapper from "../PageWrapper";
import WishlistItem from "../components/WishlistItem";
import shoppingCartSvg from "../images/shoppingCartSvg.svg";
import { addItem } from "../store/cart";
import { useSelector, useDispatch } from "react-redux";
import itemSample from "../itemSample";

export default function Wishlist() {
	const wishlistItems = useSelector((state) => state.wishlist.wishlistItem);
	console.log(wishlistItems);
	const renderedItems = Object.keys(wishlistItems).map((item) => (
		<WishlistItem key={item} productId={item} data={itemSample[item]} />
	));

	return (
		<div className="h-full md:h-screen w-full bg-gray-100 md:p-8 overflow-y-auto">
			<div className="relative flex h-full w-full flex-col items-center justify-center border-2 border-gray-800 bg-indigo-100 pt-0 md:flex-row md:justify-start md:p-8">
				{Object.keys(wishlistItems).length > 0 ? (
					<div className="h-full w-full flex flex-col md:items-start md:justify-start md:flex-row m-2 md:m-0 gap-1 md:gap-8">
						{renderedItems}
					</div>
				) : (
					<div className="flex items-center justify-center h-full w-full flex-col">
						<img src={shoppingCartSvg} alt="shopping" className="h-64 w-64" />
						<h1 className="text-2xl font-semibold text-gray-600 text-center">
							Looks like your wishlist cart is empty...
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}
