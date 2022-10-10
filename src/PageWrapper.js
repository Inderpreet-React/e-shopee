import React from "react";

export default function PageWrapper(props) {
	const additionalClasses = props.additionalClasses;
	return (
		<div className="h-screen w-full bg-gray-100 md:p-8">
			<div
				className={`relative flex h-full w-full flex-col items-center justify-center gap-6 border-2 border-gray-800 bg-indigo-100 pt-0 md:flex-row md:justify-start md:p-8 ${
					additionalClasses ? additionalClasses : ""
				}`}
			>
				{props.children}
			</div>
		</div>
	);
}
