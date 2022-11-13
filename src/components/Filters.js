import React, { useEffect, useRef, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import {
	updateFilterItems,
	isFetching,
	updateIsFiltered,
} from "../store/filters";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function Filters() {
	const [showSideBar, setShowSideBar] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const divWrapper = "flex gap-2 items-center text-white md:text-gray-600";
	const [tShirt, setTshirt] = useState(false);
	const [shirt, setShirt] = useState(false);
	const [jeans, setJeans] = useState(false);
	const [joggers, setJoggers] = useState(false);
	const [pajamas, setPajamas] = useState(false);
	const [sort, setSort] = useState(false);
	const [XS, setXS] = useState(false);
	const [S, setS] = useState(false);
	const [M, setM] = useState(false);
	const [L, setL] = useState(false);
	const [XL, setXL] = useState(false);
	const [XXL, setXXL] = useState(false);
	const a = useRef(false);
	const d = useRef(false);
	const p = useRef(false);
	const fetching = useSelector((state) => state.filter.fetching);
	const isFiltered = useSelector((state) => state.filter.isFiltered);

	const tempItems = [];

	const dispatch = useDispatch();

	async function resetFilters() {
		if (isFiltered) {
			dispatch(isFetching(true));
			const tempItems = [];
			const querySnapshot = await getDocs(collection(db, "products"));
			console.log("resetting");
			querySnapshot.forEach((doc) => {
				const newData = doc.data();
				newData["id"] = doc.id;
				console.log(newData);
				tempItems.push(newData);
			});
			dispatch(updateFilterItems(tempItems));
			dispatch(isFetching(false));
			setTshirt(false);
			setShirt(false);
			setJeans(false);
			setJoggers(false);
			setJoggers(false);
			setXS(false);
			setS(false);
			setM(false);
			setL(false);
			setXL(false);
			setXXL(false);
			p.current.checked = true;
			a.current.checked = false;
			a.current.checked = false;
			dispatch(updateIsFiltered(false));
		} else {
			console.log("F U");
			return;
		}
	}

	async function submitHandler(e) {
		e.preventDefault();
		dispatch(isFetching(true));

		try {
			if (!tShirt && !shirt && !jeans && !joggers && !pajamas && !sort) {
				console.log("No filter selected");
				dispatch(isFetching(false));
				return;
			}

			const filterRef = collection(db, "products");
			const sizeItems = [];
			const typeItems = [];
			let q = null;

			if (tShirt) {
				typeItems.push("tshirt");
			}
			if (shirt) {
				typeItems.push("shirt");
			}
			if (jeans) {
				typeItems.push("jeans");
			}
			if (joggers) {
				typeItems.push("joggers");
			}
			if (pajamas) {
				typeItems.push("pajamas");
			}
			if (XS) {
				sizeItems.push("XS");
			}
			if (S) {
				sizeItems.push("S");
			}
			if (M) {
				sizeItems.push("M");
			}
			if (L) {
				sizeItems.push("L");
			}
			if (XL) {
				sizeItems.push("XL");
			}
			if (XXL) {
				sizeItems.push("XXL");
			}

			if (typeItems.length > 0) {
				q = query(filterRef, where("type", "in", typeItems));

				if (sort === "a") {
					q = query(
						filterRef,
						where("type", "in", typeItems),
						orderBy("price")
					);
				}
				if (sort === "d") {
					q = query(
						filterRef,
						where("type", "in", typeItems),
						orderBy("price", "desc")
					);
				}
			} else {
				console.log("only sort");
				if (sort === "a") {
					console.log("a");
					q = query(filterRef, orderBy("price"));
				}
				if (sort === "d") {
					console.log("d");
					q = query(filterRef, orderBy("price", "desc"));
				}
				if (sort === "p") {
					resetFilters();
					return;
				}
			}
			console.log("WTF is this running");

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const newData = doc.data();
				newData["id"] = doc.id;
				if (sizeItems.length > 0) {
					if (sizeItems.some((item) => doc.data().size.includes(item))) {
						tempItems.push(newData);
					}
				} else {
					tempItems.push(newData);
				}
			});
			dispatch(updateFilterItems(tempItems));
			dispatch(updateIsFiltered(true));
			dispatch(isFetching(false));
		} catch (e) {
			console.log(e);
			dispatch(isFetching(false));
		}
	}

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
			className={`fixed md:shrink-0 -left-full bg-indigo-500 md:bg-transparent text-white md:text-gray-600 w-2/3 z-10 top-0 flex h-full flex-col  py-4 px-4 transition-all md:relative md:top-0 md:h-min md:w-1/6 md:flex-col border-2 border-gray-300 rounded ${
				showSideBar ? "left-0" : ""
			}`}
		>
			<form onSubmit={submitHandler} className="flex flex-col gap-4">
				<h1 className="text-xl font-semibold ">Items</h1>
				<div className="flex flex-col pl-2">
					<div className={divWrapper}>
						<input
							checked={tShirt}
							type="checkbox"
							onChange={(e) => {
								setTshirt(e.target.checked);
							}}
						/>
						<span>T-shirts</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={shirt}
							type="checkbox"
							onChange={(e) => {
								setShirt(e.target.checked);
							}}
						/>
						<span>Shirts</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={jeans}
							type="checkbox"
							onChange={(e) => {
								setJeans(e.target.checked);
							}}
						/>
						<span>Jeans</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={joggers}
							type="checkbox"
							onChange={(e) => {
								setJoggers(e.target.checked);
							}}
						/>
						<span>Joggers</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={pajamas}
							type="checkbox"
							onChange={(e) => {
								setPajamas(e.target.checked);
							}}
						/>
						<span>Pajamas</span>
					</div>
				</div>
				<h1 className="text-xl font-semibold ">Size</h1>
				<div className="flex flex-col pl-2">
					<div className={divWrapper}>
						<input
							checked={XS}
							type="checkbox"
							onChange={(e) => setXS(e.target.checked)}
						/>
						<span>XS</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={S}
							type="checkbox"
							onChange={(e) => setS(e.target.checked)}
						/>
						<span>S</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={M}
							type="checkbox"
							onChange={(e) => setM(e.target.checked)}
						/>
						<span>M</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={L}
							type="checkbox"
							onChange={(e) => setL(e.target.checked)}
						/>
						<span>L</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={XL}
							type="checkbox"
							onChange={(e) => setXL(e.target.checked)}
						/>
						<span>XL</span>
					</div>
					<div className={divWrapper}>
						<input
							checked={XXL}
							type="checkbox"
							onChange={(e) => setXXL(e.target.checked)}
						/>
						<span>XXL</span>
					</div>
				</div>
				<h1 className="text-xl font-semibold ">Sort</h1>
				<div
					className="flex flex-col pl-2"
					onChange={(e) => setSort(e.target.value)}
				>
					<div className={divWrapper}>
						<input
							ref={p}
							defaultChecked={true}
							value="p"
							name="sort"
							type="radio"
						/>
						<span>Popularity</span>
					</div>
					<div className={divWrapper}>
						<input ref={d} value="d" name="sort" type="radio" />
						<span>Price- High to Low</span>
					</div>
					<div className={divWrapper}>
						<input ref={a} value="a" name="sort" type="radio" />
						<span>Price- Low to High</span>
					</div>
				</div>
				<div className="flex gap-1 justify-evenly">
					<button
						disabled={fetching}
						type="submit"
						className="text-white disabled:cursor-not-allowed font-semibold self-start bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mt-4"
					>
						Search
					</button>
					<button
						disabled={fetching}
						onClick={resetFilters}
						type="button"
						className="text-white disabled:cursor-not-allowed font-semibold self-start bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mt-4"
					>
						Reset
					</button>
				</div>
			</form>
			<div
				className="visible fixed right-5 bottom-5 z-10 rounded-full bg-indigo-500 p-4 hover:bg-indigo-600 md:hidden"
				onClick={sidebarHandler}
			>
				<AdjustmentsHorizontalIcon className="w-8 h-8" />
			</div>
		</div>
	);
}
