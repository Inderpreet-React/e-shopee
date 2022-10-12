import React, { useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function Filters() {
	const [showSideBar, setShowSideBar] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const divWrapper = "flex gap-2 items-center text-white";

	const setDimension = () => {
		setWindowWidth(window.innerWidth);
	};

	function sidebarHandler() {
		setShowSideBar(!showSideBar);
		console.log("ran");
	}

	useEffect(() => {
		window.addEventListener("resize", setDimension);

		if (windowWidth > 768) {
			setShowSideBar(true);
		}

		return () => {
			window.removeEventListener("resize", setDimension);
		};
	}, [windowWidth]);

	return (
		<div
			className={`fixed -left-full w-2/3 z-10 top-0 flex h-full flex-col bg-indigo-500 py-8 px-4 transition-all md:relative md:top-0 md:h-full md:w-1/6 md:flex-col  ${
				showSideBar ? "left-0" : ""
			}`}
		>
			<form className="flex flex-col gap-4">
				<h1 className="text-xl font-semibold text-white">Items</h1>
				<div className="flex flex-col pl-2">
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>T-shirts</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>Shirts</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>Jeans</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>Joggers</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>Pajamas</span>
					</div>
				</div>
				<h1 className="text-xl font-semibold text-white">Items</h1>
				<div className="flex flex-col pl-2">
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>XXS</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>XS</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>S</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>M</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>L</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>XL</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>XXL</span>
					</div>
					<div className={divWrapper}>
						<input type="checkbox" />
						<span>XXXL</span>
					</div>
				</div>
				<h1 className="text-xl font-semibold text-white">Sort</h1>
				<div className="flex flex-col pl-2">
					<div className={divWrapper}>
						<input name="sort" type="radio" />
						<span>Price- High to Low</span>
					</div>
					<div className={divWrapper}>
						<input name="sort" type="radio" />
						<span>Price- Low to High</span>
					</div>
				</div>
				<button
					type="submit"
					className="text-white font-semibold self-start bg-indigo-700 px-4 py-2 rounded hover:bg-indigo-800 mt-4"
				>
					Search
				</button>
			</form>
			<div
				className="visible fixed right-5 bottom-5 z-10 rounded-full bg-indigo-500 p-4 text-white hover:bg-indigo-600 md:hidden"
				onClick={sidebarHandler}
			>
				<AdjustmentsHorizontalIcon className="w-8 h-8" />
			</div>
		</div>
	);
}
