import {
	deleteField,
	doc,
	updateDoc,
	increment,
	getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/cart";

export default function SummaryCard(props) {
	const productId = props.productId;
	const size = props.size;
	const quantity = props.quantity;
	const [data, setData] = useState({});
	const userUid = useSelector((state) => state.user.userUid);
	const loading = useSelector((state) => state.cart.loading);
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const dispatch = useDispatch();

	useEffect(() => {
		const getDetails = async () => {
			const docRef = doc(db, "products", productId);
			const docSnap = await getDoc(docRef);
			console.log(docSnap.data());
			setData(docSnap.data());
		};
		if (isAuthenticated) {
			getDetails();
			console.log("fetchhhh");
		}
	}, []);

	async function removeItemHandler() {
		dispatch(setLoading(true));
		try {
			const itemRef = doc(db, "users", userUid);
			console.log("part  ran");
			console.log(-Math.abs(data.price * quantity));
			await updateDoc(itemRef, {
				cartTotal: increment(-Math.abs(data.price * quantity)),
			});
			const key = `${productId}${size}`;
			await updateDoc(itemRef, {
				[`userCart.${key}`]: deleteField(),
			});
			dispatch(setLoading(false));
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	return (
		<div className="flex gap-4">
			<img
				className="w-28 md:w-36 rounded-md h-auto"
				src={data?.pImg}
				alt="product"
			/>
			<div className="flex text-gray-600 justify-between w-full">
				<div className="flex flex-col ">
					<h3 className="text-lg font-semibold">{data?.name}</h3>
					<h4 className="text-xs">{data?.type}</h4>
					<div className="flex gap-4 mt-4">
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							Size: {size}
						</span>
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							₹ {data?.price}/-
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
			<div className="font-semibold whitespace-nowrap">
				₹ {data?.price * quantity}/-
			</div>
		</div>
	);
}
