import React from "react";
import PageWrapper from "../PageWrapper";
import OopsSvg from "../images/oopsSvg.svg";

export default function PageNotFound() {
	return (
		<PageWrapper>
			<h1 className="absolute top-5 left-5 text-xl font-extrabold text-indigo-500 md:text-3xl">
				E-Shopee
			</h1>
			<div className="h-full w-full">
				<div className="h-2/3 w-full">
					<img className="h-full w-full" src={OopsSvg} alt="Page not found" />
				</div>
				<h1 className="h-1/3 text-center text-2xl font-semibold">
					Bruh! I cannot find this page 😭
				</h1>
			</div>
		</PageWrapper>
	);
}
