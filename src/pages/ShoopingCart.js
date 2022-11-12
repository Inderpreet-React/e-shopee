import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import shoppingCartSvg from "../images/shoppingCartSvg.svg";
import SummaryCard from "../components/SummaryCard";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ShoopingCart() {
	const [fetching, setFetching] = useState(false);
	const [data, setData] = useState({});
	const cartItems = useSelector((state) => state.cart.cartItem);
	const cartProducts = Object.keys(cartItems);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		async function fetchData() {
			setFetching(true);
			try {
				const querySnapshot = await getDocs(collection(db, "products"));
				querySnapshot.forEach((doc) => {
					if (cartProducts.includes(doc.id)) {
						setData((prevState) => {
							const newData = { ...prevState };
							newData[doc.id] = doc.data();
							newData[doc.id]["quantity"] = cartItems[doc.id]["quantity"];
							newData[doc.id]["size"] = cartItems[doc.id]["size"];
							// console.log(newData);
							return newData;
						});
					}
				});
				// cartTotal = cartTotal + data[item].price
				Object.keys(data).map((item) =>
					setCartTotal((prevState) => {
						console.log(prevState + data[item]["price"]);
						const newValue = prevState + data[item]["price"];
						return newValue;
					})
				);
				setFetching(false);
			} catch (e) {
				console.log(e);
				setFetching(false);
			}
		}

		fetchData();
	}, []);

	const cartHasItems = Object.keys(cartItems).length === 0;
	// console.log(cartTotal);

	return (
		<PageWrapper>
			{!cartHasItems ? (
				<div className="flex w-full h-full md:flex-row flex-col">
					<div className="flex flex-col md:flex-row p-4 md:p-8  w-full md:w-2/3 h-full">
						{!fetching ? (
							<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll">
								{Object.keys(data).map((item) => (
									<SummaryCard key={item} productId={item} data={data[item]} />
								))}
							</div>
						) : (
							<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 items-center justify-center">
								<p className="text-xl font-bold italic text-indigo-500">
									Fetching your cart...
								</p>
							</div>
						)}
					</div>

					<div className="flex flex-col md:flex-row p-4 md:p-8  w-full md:w-1/3 h-full">
						{!fetching ? (
							<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll">
								<table>
									<tbody className="divide-y-2 last:divide-y-0">
										<tr>
											<th className="text-left py-2">Cart Total</th>
											<td className="text-right">₹ {cartTotal}</td>
										</tr>
										<tr>
											<th className="text-left py-2">Discount</th>
											<td className="text-right">₹ 0</td>
										</tr>
										<tr>
											<th className="text-left py-2">GST</th>
											<td className="text-right">₹ {(cartTotal * 18) / 100}</td>
										</tr>
										<tr>
											<th className="text-left py-2">Total Amount</th>
											<td className="text-right">
												₹ {cartTotal + cartTotal * (18 / 100)}
											</td>
										</tr>
									</tbody>
								</table>
								<button className="p-2 bg-indigo-500 text-white w-full hover:bg-indigo-600">
									Place Order
								</button>
							</div>
						) : (
							<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll"></div>
						)}
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center h-full w-full flex-col">
					<img src={shoppingCartSvg} alt="shopping" className="h-64 w-64" />
					<h1 className="text-2xl font-semibold text-gray-600">
						Looks like your shooping cart is empty...
					</h1>
					<p className="mt-4 text-gray-800">
						Please have something soon, carts have feeling too.
					</p>
				</div>
			)}
		</PageWrapper>
	);
}
