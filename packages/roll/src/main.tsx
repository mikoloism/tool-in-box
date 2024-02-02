import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App
			themeProps="theme-props"
			anotherProps="another-props"
			customProps="custom-props"
		/>
	</React.StrictMode>
);
