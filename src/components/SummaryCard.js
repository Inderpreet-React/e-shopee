import React from "react";

export default function SummaryCard() {
	const imgLink =
		"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1659004146_9433808.jpg?format=webp&w=300&dpr=1.3";
	return (
		<div className="flex gap-4">
			<img
				className="w-28 md:w-36 rounded-md h-auto"
				src={imgLink}
				alt="product"
			/>
			<div className="flex text-gray-600 justify-between w-full">
				<div className="flex flex-col ">
					<h3 className="text-lg font-semibold">Default Name</h3>
					<h4 className="text-xs">Mens Jogger</h4>
					<div className="flex gap-4 mt-4">
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							Size: xl
						</span>
						<span className="text-sm font-semibold border-2 border-gray-300 rounded p-1 ">
							Qty: 1
						</span>
					</div>
					<button className=" bg-indigo-500 rounded p-1 text-white min-w-min mt-4">
						Remove
					</button>
				</div>
			</div>
			<div className="font-semibold whitespace-nowrap">₹ 500/-</div>
		</div>
	);
}
