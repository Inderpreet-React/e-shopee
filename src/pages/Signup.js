import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { Link } from "react-router-dom";
import SignupSvg from "../images/signupSvg.svg";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import SelectCity from "../components/SelectCity";

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		const email = e.target[0].value;
		const displayName = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		try {
			// User creation
			const res = await createUserWithEmailAndPassword(auth, email, password);

			// Image upload
			const date = new Date().getTime();
			const storageRef = ref(storage, `${displayName + date}`);

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						//Update profile
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						//create user on firestore
						await setDoc(doc(db, "users", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});

						//create empty user chats on firestore
						await setDoc(doc(db, "userChats", res.user.uid), {});
						setLoading(false);
						navigate("/chat");
					} catch (err) {
						console.log(err);
						setError(true);
						setLoading(false);
					}
				});
			});
		} catch (err) {
			setError(true);
			setLoading(false);
			console.log(err.message);
		}
	};

	return (
		<PageWrapper heightFull={true}>
			<h1 className="absolute top-5 left-5 text-xl font-extrabold text-indigo-500 md:text-3xl">
				E-Shopee
			</h1>

			<div className="flex h-1/4 w-full items-center justify-center bg-indigo-100 md:order-last md:h-3/4 md:w-2/3">
				<img
					src={SignupSvg}
					alt="login"
					className="h-5/6 w-5/6 md:h-full md:w-full"
				/>
			</div>

			<div className="flex h-3/4 w-3/4 flex-col md:h-5/6 md:w-4/5 md:p-4 md:pl-8 overscroll-y-auto">
				<div className="flex w-full items-center  justify-between md:pl-[25%]">
					<h1 className="text-4xl font-bold text-gray-600">Sign up</h1>
					<Link
						to="/login"
						className="text-xl font-semibold italic text-indigo-600 underline underline-offset-8"
					>
						Log in
					</Link>
				</div>

				<form
					onSubmit={submitHandler}
					className="flex flex-col md:flex-row mt-1 w-full justify-evenly gap-4 h-full"
				>
					<div className="flex flex-col gap-4">
						<div className="input-wrapper">
							<p className="text-gray-600">Email</p>
							<input required type="email" placeholder="eldermaster@69.com" />
						</div>
						<div className="input-wrapper">
							<p className="text-gray-600">Username</p>
							<input required type="text" placeholder="Eldermaster69" />
						</div>
						<div className="input-wrapper">
							<p className="text-gray-600">Password</p>
							<input required type="password" placeholder="**********" />
						</div>
						<div className="input-wrapper">
							<p className="text-gray-600">Phone No.</p>
							<input required type="text" placeholder="123456789" />
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="input-wrapper">
							<p className="text-gray-600">Address</p>
							<input
								required
								type="text"
								placeholder="XYZ street near Model Town"
							/>
						</div>
						<div className="input-wrapper">
							<p className="text-gray-600">Pin Code</p>
							<input required type="text" placeholder="144001" />
						</div>
						<div className="input-wrapper">
							<p className="text-gray-600">City</p>
							<SelectCity cName={"text-gray-600"} />
						</div>
						<button
							className={`w-1/2 self-end my-2 rounded bg-indigo-500 px-8 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:text-gray-400 md:w-2/3 ${
								loading ? "cursor-wait" : ""
							}`}
							type="submit"
							disabled={loading}
						>
							Sign up
						</button>
					</div>
				</form>
				{error ? <p className="text-pink-500">"There was an error"</p> : ""}
			</div>
		</PageWrapper>
	);
}
