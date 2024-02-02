import React from "react";

export function withAnotherHoc<P = {}>(Component: React.ComponentType<P>) {
	return (props: P) => {
		return (
			<div>
				<h2 style={{ marginLeft: "32px" }}>Nested</h2>
				<Component
					{...(props as P)}
					style={{ marginLeft: "64px" }}
					anotherProps="another-props"
				/>
			</div>
		);
	};
}

export interface AnotherHoc {
	anotherProps: "another-props";
}
