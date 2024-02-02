import React from "react";
import { withAnotherHoc, type AnotherHoc } from "./roll/another";
import { Roller } from "./roll/roller";
import { withThemeHoc, type ThemeHoc } from "./roll/theme";

const MyComponent: React.FC<Props & ThemeHoc & AnotherHoc> = (props) => {
	return (
		<div className=":uno: p-(3 l-24) bg-sky-900 text-sky-300 hover:(bg-amber-800 text-amber-300) sm:(border-green-300 border-solid) xl:(border-sky-300 border-solid) md:(border-amber-300 border-solid)">
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
