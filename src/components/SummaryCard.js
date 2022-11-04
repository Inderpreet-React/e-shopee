import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/cart";

export default function SummaryCard(props) {
	const productId = props.productId;
	const data = props.data;
	const name = data["name"];
	const type = data["type"];
	const size = data["size"];
	const quantity = data["quantity"];
	const imgLink = data["pImg"];
	const price = data["price"];
	const dispatch = useDispatch();

	function removeItemHandler() {
		// dispatch(addItem(["Jogger", 2, "xl"]));
		dispatch(removeItem(productId));
	}

	return (
		<div className="flex gap-4">
			<img
				className="w-28 md:w-36 rounded-md h-auto"
				src={imgLink}
				alt="product"
			/>
			<div className="flex text-gray-600 justify-between w-full">
				<div className="flex flex-col ">
					<h3 className="text-lg font-semibold">{name}</h3>
					<h4 className="text-xs">{type}</h4>
					<div className="flex gap-4 mt-4">
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							Size: {size}
						</span>
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							Qty: {quantity}
						</span>
					</div>
					<button
						onClick={removeItemHandler}
						className=" bg-indigo-500 rounded p-1 text-white min-w-min mt-4 hover:bg-indigo-600"
					>
						Remove
					</button>
				</div>
			</div>
			<div className="font-semibold whitespace-nowrap">₹ {price}/-</div>
		</div>
	);
}
