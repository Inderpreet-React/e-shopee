import React from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import itemSample from "../itemSample";
import { Link } from "react-router-dom";

export default function Home() {
	const items = itemSample;
	return (
		<div className="flex flex-col h-[8vh]">
			<Navbar />
			<div className="p-4 h-screen md:h-[92vh] w-full flex gap-8">
				<Filters />
				<div className="flex flex-wrap gap-8 overflow-y-auto h-full">
					{Object.keys(items).map((itemKey) => (
						<Link
							to={`products/${itemKey}`}
							className="w-[45%] md:w-[22%] overflow-hidden"
						>
							<ProductCard
								key={itemKey}
								type={items[itemKey]["type"]}
								price={items[itemKey]["price"]}
								imgLink={items[itemKey]["pImg"]}
								name={items[itemKey]["name"]}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
