import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import itemSample from "../itemSample";
import { addItem } from "../store/cart";
import { useDispatch } from "react-redux";

export default function ProductDetails() {
	const { productId } = useParams();
	const quantityRef = useRef(1);
	const [size, setSize] = useState("");
	const [sizeError, setSizeError] = useState(false);
	const dispatch = useDispatch();

	function radioBtnHandler(e) {
		setSizeError(false);
		setSize(e.target.value);
	}

	function cartHandler() {
		if (size.length === 0) {
			setSizeError(true);
			return;
		}
		const data = itemSample[productId];
		data["size"] = size;
		data["quantity"] = parseInt(quantityRef.current.value);
		dispatch(addItem([productId, { ...data }]));
	}

	return (
		<div className="flex flex-col h-[8vh]">
			<Navbar />
			<div className="p-4 md:p-8 md:py-4 h-screen md:h-[92vh] w-full flex flex-col gap-8 md:flex-row">
				<div>
					<img src={itemSample[productId]["pImg"]} alt="product" />
				</div>
				<div className="flex gap-4 mb-2 flex-col text-gray-600">
					<div className="flex flex-col gap-0">
						<h3 className="text-2xl font-bold">
							{itemSample[productId]["name"]}
						</h3>
						<h3 className="text-lg text-gray-500">
							{itemSample[productId]["type"]}
						</h3>
					</div>
					<h2 className="text-xl font-semibold">
						₹ {itemSample[productId]["price"]}
					</h2>
					<hr></hr>
					<div className="flex flex-col gap-4">
						<p className="font-bold">Please select the size.</p>
						<ul className="flex gap-2 flex-wrap">
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="XXS"
									name="size"
									className=""
									type="radio"
								/>
								<span>XXS</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="XS"
									name="size"
									className=""
									type="radio"
								/>
								<span>XS</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="S"
									name="size"
									className=""
									type="radio"
								/>
								<span>S</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="M"
									name="size"
									className=""
									type="radio"
								/>
								<span>M</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="L"
									name="size"
									className=""
									type="radio"
								/>
								<span>L</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="XL"
									name="size"
									className=""
									type="radio"
								/>
								<span>XL</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="XXL"
									name="size"
									className=""
									type="radio"
								/>
								<span>XXL</span>
							</li>
							<li className="flex items-center gap-1">
								<input
									onChange={radioBtnHandler}
									value="XXXL"
									name="size"
									className=""
									type="radio"
								/>
								<span>XXXL</span>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-4 min-w-min">
						<p>Quantity</p>
						<select ref={quantityRef}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</select>
					</div>
					<div className="flex gap-2">
						<button
							onClick={cartHandler}
							disabled={size.length === 0}
							className="disabled:cursor-not-allowed w-1/2 py-2 bg-indigo-500 text-white font-semibold hover:bg-indigo-700"
						>
							Add to cart
						</button>
						<button className="w-1/2 py-2 bg-indigo-500 text-white font-semibold hover:bg-indigo-700">
							Add to Wishlist
						</button>
					</div>
					<hr></hr>
					<div className="border-2 border-gray-300 p-4">
						<h3 className="font-semibold">Product Details</h3>
						<div className="p-2 pr-0 flex gap-1 flex-col">
							<p className="font-semibold">Material Details:</p>
							<p>100% Cotton</p>
							<p>Machine Wash</p>
						</div>
						<div className="p-1 pr-0 flex gap-1 flex-col">
							<p className="font-semibold">Country of Origin:</p>
							<p>India</p>
						</div>
						<div className="p-1 pr-0 flex gap-1 flex-col">
							<p className="font-semibold">Manufactured by:</p>
							<p>E-Shopee Pvt Ltd.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
