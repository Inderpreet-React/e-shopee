import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { removeWishlistItem } from "../store/wishlist";

export default function WishlistItem(props) {
	const productId = props.productId;
	const data = props.data;
	const name = data["name"];
	const price = data["price"];
	const type = data["type"];
	const pImg = data["pImg"];
	const dispatch = useDispatch();
	const wishlistItems = useSelector((state) => state.wishlist.wishlistItem);
	console.log(wishlistItems);

	function removeFromWishlist() {
		dispatch(removeWishlistItem(productId));
	}

	return (
		<div>
			<Link to={`/products/${productId}`}>
				<div className="w-full md:w-56 p-4 md:p-0 text-gray-700">
					<img
						src={pImg}
						alt="product"
						className="w-full h-auto border-2 border-gray-600"
					/>
					<h3 className="text-2xl font-bold border-b-2 border-gray-400">
						{name}
					</h3>
					<p className="text-gray-600 text-lg">{type}</p>
					<p className="text-lg text-gray-600 font-semibold">₹ {price}/-</p>
				</div>
			</Link>
			<div className="flex gap-2 mt-1 md:mt-4 text-white p-4 md:p-0">
				<button
					onClick={removeFromWishlist}
					className="bg-indigo-600 hover:bg-indigo-800 w-full py-2 flex rounded justify-center items-center"
				>
					<TrashIcon className=" w-5 h-5" />
				</button>
			</div>
		</div>
	);
}
