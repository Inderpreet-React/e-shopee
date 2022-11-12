import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";

export default function SummaryCard(props) {
	const productId = props.productId;
	const [loading, setLoading] = useState(false);
	const data = props.data;
	const name = data["name"];
	const type = data["type"];
	const size = data["size"];
	const quantity = data["quantity"];
	const imgLink = data["pImg"];
	const price = data["price"];
	const userUid = useSelector((state) => state.user.userUid);
	const cartItems = useSelector((state) => state.cart.cartItem);

	async function removeItemHandler() {
		setLoading(false);
		try {
			const itemRef = doc(db, "users", userUid);
			await updateDoc(itemRef, {
				[`userCart.${productId}`]: deleteField(),
			});
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	if (!(productId in cartItems)) {
		return;
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
						disabled={loading}
						onClick={removeItemHandler}
						className=" bg-indigo-500 disabled:bg-indigo-600 disabled:cursor-not-allowed rounded p-1 text-white min-w-min mt-4 hover:bg-indigo-600"
					>
						Remove
					</button>
				</div>
			</div>
			<div className="font-semibold whitespace-nowrap">₹ {price}/-</div>
		</div>
	);
}
