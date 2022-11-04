import React from "react";

export default function ProductCard(props) {
	const imgLink =
		"https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1659004146_9433808.jpg?format=webp&w=300&dpr=1.3";

	return (
		<>
			<img
				className="w-full h-auto"
				src={props.imgLink || imgLink}
				alt="clothes"
			/>
			<div className="flex flex-col gap-1">
				<h2 className="border-b-2 text-lg border-spacing-8 font-semibold text-gray-600 border-gray-400">
					{props.name || "Default Name"}
				</h2>
				<p className="text-gray-500 text-sm">{props.type || "Joggers"}</p>
				<p className="font-semibold text-sm text-gray-600">
					{props.price ? `₹${props.price}` : "₹500/-"}
				</p>
			</div>
		</>
	);
}
