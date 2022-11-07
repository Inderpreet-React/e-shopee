import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function WishlistItem(props) {
	const productId = props.productId;
	const data = props.data;
	const name = data["name"];
	const price = data["price"];
	const type = data["type"];
	const pImg = data["pImg"];

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
				<button className="bg-indigo-600 w-1/2 py-2 flex rounded justify-center items-center">
					<ShoppingCartIcon className=" w-5 h-5" />
				</button>
				<button className="bg-indigo-600 w-1/2 py-2 flex rounded justify-center items-center">
					<TrashIcon className=" w-5 h-5" />
				</button>
			</div>
		</div>
	);
}
