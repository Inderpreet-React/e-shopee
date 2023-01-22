import React from "react";
import PageWrapper from "../PageWrapper";
import OopsSvg from "../images/oopsSvg.svg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function PageNotFound() {
	return (
		<PageWrapper>
			<Navbar />
			<div className="h-full w-full">
				<div className="h-2/3 w-full">
					<img className="h-full w-full" src={OopsSvg} alt="Page not found" />
				</div>
				<h1 className="h-1/3 text-center text-2xl font-semibold">
					Bruh! I cannot find this page 😭. Go back to{" "}
					<Link to="/" className="text-violet-500 underline">
						Home Page
					</Link>
				</h1>
			</div>
		</PageWrapper>
	);
}
