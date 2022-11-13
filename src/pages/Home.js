import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { updateFilterItems } from "../store/filters";

export default function Home() {
	const items = useSelector((state) => state.filter.items);
	const fetching = useSelector((state) => state.filter.fetching);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const tempItems = [];
			const querySnapshot = await getDocs(collection(db, "products"));
			querySnapshot.forEach((doc) => {
				const newData = doc.data();
				newData["id"] = doc.id;
				tempItems.push(newData);
			});
			dispatch(updateFilterItems([...tempItems]));
			setLoading(false);
		}
		if (items.length === 0) {
			fetchData();
		}
	});

	return (
		<div className="flex flex-col">
			{!loading ? (
				<>
					<Navbar />
					<div className="p-4 h-screen md:h-[92vh] w-full flex gap-8">
						<Filters />

						<div className="flex flex-wrap gap-8 overflow-y-auto h-full w-full">
							{!fetching ? (
								Object.keys(items).map((itemKey) => (
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
								))
							) : (
								<h2 className="h-full grid place-content-center border-2 border-gray-300  w-full font-bold text-xl italic text-indigo-500">
									Checking the store....
								</h2>
							)}
						</div>
					</div>
				</>
			) : (
				<PageLoader message={"Loading Products..."} />
			)}
		</div>
	);
}
