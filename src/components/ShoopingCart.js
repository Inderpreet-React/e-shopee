import React from "react";
import PageWrapper from "../PageWrapper";
import shoppingCartSvg from "../images/shoppingCartSvg.svg";
import SummaryCard from "./SummaryCard";

export default function ShoopingCart() {
	const shoopingCart = true;

	return (
		<PageWrapper>
			{shoopingCart ? (
				<div className="p-4 md:p-8  w-full md:w-1/2 h-full">
					<div className="p-4 bg-white rounded border-2 border-gray-400 h-full flex-col flex gap-4 overflow-y-scroll">
						<SummaryCard />
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
