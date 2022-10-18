import React from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

export default function Home() {
	return (
		<div className="flex flex-col h-[8vh]">
			<Navbar />
			<div className="p-4 h-screen md:h-[92vh] w-full flex gap-8">
				<Filters />
				<div className="flex flex-wrap gap-8 overflow-y-auto h-full">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</div>
		</div>
	);
}
