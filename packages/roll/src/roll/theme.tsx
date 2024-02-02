import React from "react";

export function withThemeHoc<P = {}>(Component: React.ComponentType<P>) {
	return (props: P) => {
		return (
			<main>
				<h1 style={{ marginLeft: "16px" }}>Hello</h1>
				<Component
					{...(props as P)}
					style={{ marginLeft: "32px" }}
					themeProps="theme-props"
				/>
			</main>
		);
	};
}

export interface ThemeHoc {
	themeProps: "theme-props";
}
