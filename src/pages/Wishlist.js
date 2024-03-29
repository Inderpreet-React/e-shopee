import React, { useEffect, useState } from "react";
import WishlistItem from "../components/WishlistItem";
import shoppingCartSvg from "../images/shoppingCartSvg.svg";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Wishlist() {
	const wishlistItems = useSelector((state) => state.wishlist.wishlistItem);
	const [fetching, setFetching] = useState(false);
	const [data, setData] = useState("");

	useEffect(() => {
		async function fetchData() {
			setFetching(true);
			try {
				const querySnapshot = await getDocs(collection(db, "products"));
				querySnapshot.forEach((doc) => {
					if (wishlistItems.includes(doc.id)) {
						setData((prevState) => {
							const newData = { ...prevState };
							newData[doc.id] = doc.data();
							return newData;
						});
					}
				});
				setFetching(false);
			} catch (e) {
				console.log(e);
				setFetching(false);
			}
		}

		fetchData();
	}, [wishlistItems]);

	return (
		<>
			<Navbar />
			<div className="h-full md:h-screen w-full bg-gray-100 md:p-8 overflow-y-auto">
				<div className="relative flex h-full w-full flex-col items-center justify-center border-2 border-gray-800 bg-indigo-100 pt-0 md:flex-row md:justify-start md:p-8">
					{Object.keys(wishlistItems).length > 0 ? (
						<div className="h-full min-h-screen md:min-h-full w-full flex flex-col md:items-start md:justify-start md:flex-row m-2 md:m-0 gap-1 md:gap-8">
							{!fetching ? (
								Object.keys(data).map((item) => (
									<WishlistItem key={item} productId={item} data={data[item]} />
								))
							) : (
								<p className="text-xl font-bold h-full w-full flex items-center justify-center text-gray-600">
									Fetching your wishlist...
								</p>
							)}
						</div>
					) : (
						<div className="flex min-h-screen items-center justify-center h-full w-full flex-col">
							<img src={shoppingCartSvg} alt="shopping" className="h-64 w-64" />
							<h1 className="text-2xl font-semibold text-gray-600 text-center">
								Looks like your wishlist cart is empty...
							</h1>
							<p className="text-xl font-semibold text-gray-600">
								Go back to{" "}
								<Link to="/" className="text-violet-600 underline text-xl">
									Home page
								</Link>
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
