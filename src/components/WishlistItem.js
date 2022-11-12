import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import {
	arrayRemove,
	doc,
	increment,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function WishlistItem(props) {
	const productId = props.productId;
	const data = props.data;
	const name = data["name"];
	const price = data["price"];
	const type = data["type"];
	const pImg = data["pImg"];
	const quantityRef = useRef(1);
	const sizeRef = useRef("XXS");
	const [loading, setLoading] = useState(false);
	const wishlistItems = useSelector((state) => state.wishlist.wishlistItem);
	const userUid = useSelector((state) => state.user.userUid);
	const cartItems = useSelector((state) => state.cart.cartItem);

	async function removeFromWishlist() {
		setLoading(true);
		try {
			const itemRef = doc(db, "users", userUid);
			await updateDoc(itemRef, {
				userWishlist: arrayRemove(productId),
			});
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addToCart(e) {
		e.preventDefault();
		const quantity = quantityRef.current.value;
		const size = sizeRef.current.value;
		setLoading(true);
		try {
			const cartRef = doc(db, "users", userUid);
			await updateDoc(cartRef, {
				userWishlist: arrayRemove(productId),
			});
			await updateDoc(cartRef, {
				cartTotal: increment(price * quantity),
			});
			await setDoc(
				cartRef,
				{
					userCart: {
						[productId]: { size: size, quantity: quantity },
					},
				},
				{ merge: true }
			);
			setLoading(true);
		} catch (e) {
			console.log("There was some error pls try again: ", e);
		}
	}

	if (wishlistItems.includes(productId))
		return (
			<div>
				<Link to={`/products/${productId}`}>
					<div className="w-full md:w-56 p-4 md:p-0 text-gray-700">
						<img
							src={pImg}
							alt="product"
							className="w-full h-auto border-2 border-gray-600"
						/>
						<h3 className="text-lg font-bold border-b-2 border-gray-400">
							{name}
						</h3>
						<p className="text-gray-600 text-lg">{type}</p>
						<p className="text-lg text-gray-600 font-semibold">₹ {price}/-</p>
					</div>
				</Link>
				<div className="flex flex-col gap-2 mt-1 md:mt-4 text-white p-4 md:p-0">
					<form className="flex flex-col gap-2 text-gray-600">
						<div className="flex gap-2">
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
							<select ref={sizeRef}>
								<option value="XXS">XXS</option>
								<option value="XS">XS</option>
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="L">L</option>
								<option value="XL">XL</option>
								<option value="XXL">XXL</option>
								<option value="XXXL">XXXL</option>
							</select>
						</div>
						{!(productId in cartItems) ? (
							<button
								disabled={loading}
								onClick={addToCart}
								className="bg-indigo-600 hover:bg-indigo-800 disabled:cursor-not-allowed text-white w-full py-2 flex rounded justify-center items-center"
							>
								Move to cart
							</button>
						) : (
							<button className="bg-indigo-600 hover:bg-indigo-800 disabled:cursor-not-allowed text-white w-full py-2 flex rounded justify-center items-center">
								<Link
									className="flex items-center justify-center w-full h-full"
									to="/cart"
								>
									Go to your Cart
								</Link>
							</button>
						)}
					</form>
					<button
						disabled={loading}
						onClick={removeFromWishlist}
						className="bg-indigo-600 hover:bg-indigo-800 disabled:cursor-not-allowed w-full py-2 flex rounded justify-center items-center"
					>
						<TrashIcon className=" w-5 h-5" />
					</button>
				</div>
			</div>
		);
}
