import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { removeItem } from "../store/cart";
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
	const dispatch = useDispatch();

	// async function removeItemHandler() {
	// 	// dispatch(addItem(["Jogger", 2, "xl"]));
	// 	// dispatch(removeItem(productId));
	// 	console.log("1 part");
	// 	setLoading(false);
	// 	try {
	// 		const itemRef = doc(db, "users", userUid);
	// 		console.log("2 part", `userCart.${productId}`);
	// 		const res = await updateDoc(itemRef, {
	// 			[`userCart.${productId}`]: deleteField(),
	// 		});
	// 		console.log("3 part", res, typeof setRerender);
	// 		setLoading(false);
	// 		props.setRerender(productId);
	// 	} catch (e) {
	// 		console.log(e);
	// 		setLoading(false);
	// 	}
	// }

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
						// onClick={removeItemHandler}
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
