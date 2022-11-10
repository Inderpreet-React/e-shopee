import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Home() {
	// const items = itemSample;
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, "products"));
			querySnapshot.forEach((doc) => {
				const newData = doc.data();
				newData["id"] = doc.id;
				setItems((prevState) => {
					return [...prevState, newData];
				});
				setLoading(false);
			});
		}
		if (items.length === 0) {
			fetchData();
		}
	});

	return (
		<div className="flex flex-col h-[8vh]">
			{!loading ? (
				<>
					<Navbar />
					<div className="p-4 h-screen md:h-[92vh] w-full flex gap-8">
						<Filters />
						<div className="flex flex-wrap gap-8 overflow-y-auto h-full">
							{Object.keys(items).map((itemKey) => (
								<Link
									key={itemKey}
									to={`products/${items[itemKey]["id"]}`}
									className="w-[45%] md:w-[22%] h-min overflow-hidden"
								>
									<ProductCard
										type={items[itemKey]["type"]}
										price={items[itemKey]["price"]}
										imgLink={items[itemKey]["pImg"]}
										name={items[itemKey]["name"]}
									/>
								</Link>
							))}
						</div>
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}
