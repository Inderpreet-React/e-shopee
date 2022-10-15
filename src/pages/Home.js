import React from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

export default function Home() {
	return (
		<div className="p-4 h-screen w-full flex gap-8">
			<Filters />
			<div className="flex flex-wrap gap-8 overflow-y-auto">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	);
}
