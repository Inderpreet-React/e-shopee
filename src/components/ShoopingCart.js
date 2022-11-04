import React from "react";
import PageWrapper from "../PageWrapper";
import shoppingCartSvg from "../images/shoppingCartSvg.svg";
import SummaryCard from "./SummaryCard";
import { useSelector } from "react-redux";

export default function ShoopingCart() {
	const cartItems = useSelector((state) => state.cart.cartItem);
	const cartHasItems = Object.keys(cartItems).length === 0;
	console.log(cartHasItems);

	return (
		<PageWrapper>
			{!cartHasItems ? (
				<div className="flex w-full h-full md:flex-row flex-col">
					<div className="flex flex-col md:flex-row p-4 md:p-8  w-full md:w-2/3 h-full">
						<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll">
							{cartHasItems ? (
								<div className="flex flex-col h-full text-gray-600 w-full items-center justify-center text-center">
									<h1 className="text-2xl font-bold">
										Your shopping cart is empty.
									</h1>
									<p>Please add something soon, carts have feelings too.</p>
								</div>
							) : (
								Object.keys(cartItems).map((item) => (
									<SummaryCard
										key={item}
										productId={item}
										data={cartItems[item]}
									/>
								))
							)}
						</div>
					</div>
					<div className="flex flex-col md:flex-row p-4 md:p-8  w-full md:w-1/3 h-full">
						<div className="p-4 bg-white w-full rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll">
							<table>
								<tbody className="divide-y-2 last:divide-y-0">
									<tr>
										<th className="text-left py-2">Cart Total</th>
										<td className="text-right">₹ 500</td>
									</tr>
									<tr>
										<th className="text-left py-2">Discount</th>
										<td className="text-right">₹ 0</td>
									</tr>
									<tr>
										<th className="text-left py-2">GST</th>
										<td className="text-right">₹ {(500 * 18) / 100}</td>
									</tr>
									<tr>
										<th className="text-left py-2">Total Amount</th>
										<td className="text-right">₹ {500 + (500 * 18) / 100}</td>
									</tr>
								</tbody>
							</table>
							<button className="p-2 bg-indigo-500 text-white w-full hover:bg-indigo-600">
								Place Order
							</button>
						</div>
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
