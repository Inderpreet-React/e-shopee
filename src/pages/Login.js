import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { Link } from "react-router-dom";
import LoginSvg from "../images/loginSvg.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/user";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const user = useSelector((state) => state.user.user);
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(user, isAuthenticated);

	async function loginHandler(e) {
		setLoading(true);
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			if (password.length < 6) {
				throw new Error("Password length cannot be less than 6");
			}

			signInWithEmailAndPassword(auth, email.trim(), password.trim())
				.then((response) => {
					console.log(response.user);
					setLoading(false);
					navigate(-1);
				})
				.catch((e) => {
					setError(e.message.replace("Firebase: Error ", "Error: "));
					setLoading(false);
				});
		} catch (e) {
			console.log(e.message);
			setError(`${e.message}`);
			setLoading(false);
		}
	}

	return (
		<PageWrapper>
			<Link
				to="/"
				className="absolute top-5 left-5 text-xl font-extrabold text-indigo-500 md:text-3xl"
			>
				E-Shopee
			</Link>
			<div className="h-1/4 w-full bg-indigo-100 md:order-last md:h-3/4 md:w-2/3">
				<img src={LoginSvg} alt="login" className="h-full w-full" />
			</div>

			<div className="flex h-3/4 w-3/4 flex-col md:h-5/6 md:w-1/2 md:p-4 md:pl-8">
				<div className="flex h-1/6 w-full items-center  justify-between md:pl-[25%]">
					<h1 className="text-4xl font-bold text-gray-600">Log in</h1>
					<Link
						to="/signup"
						className="text-xl font-semibold italic text-indigo-600 underline underline-offset-8"
					>
						Sign up
					</Link>
				</div>

				<form
					onSubmit={loginHandler}
					className="mt-12 flex h-1/2 w-full flex-col justify-evenly gap-6 md:mt-24 md:w-3/4 md:self-end"
				>
					<div className="input-wrapper">
						<p className="text-gray-600">Email</p>
						<input required type="email" placeholder="sample@ex.com" />
					</div>
					<div className="input-wrapper">
						<p className="text-gray-600">Password</p>
						<input required type="password" placeholder="**********" />
					</div>
					{error ? <p className="font-semibold text-pink-500">{error}</p> : ""}
					<button
						className={`mt-4 w-1/2 self-end rounded bg-indigo-500 px-8 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:bg-indigo-600 disabled:text-gray-400 md:mt-8 md:w-2/3 ${
							loading ? "cursor-wait" : ""
						}`}
						type="submit"
						disabled={loading}
					>
						Log in
					</button>
				</form>
			</div>
		</PageWrapper>
	);
}
