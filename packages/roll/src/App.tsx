import React from "react";
import { withAnotherHoc, type AnotherHoc } from "./roll/another";
import { Roller } from "./roll/roller";
import { withThemeHoc, type ThemeHoc } from "./roll/theme";

const MyComponent: React.FC<Props & ThemeHoc & AnotherHoc> = (props) => {
	return (
		<div style={(props as any).style}>
			<p>custom-props: {props.customProps}</p>
			<p>theme-props: {props.themeProps}</p>
			<p>another-props: {props.anotherProps}</p>
		</div>
	);
};

interface Props extends React.PropsWithChildren {
	customProps: "custom-props";
}

// export default withThemeHoc(withAnotherHoc(MyComponent));
export default new Roller()
	.roll<ThemeHoc>(withThemeHoc)
	.roll<AnotherHoc>(withAnotherHoc)
	.around<Props>(MyComponent);
