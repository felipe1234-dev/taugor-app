// Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import App from "./App";

// Providers
import { MasterProvider } from "@app/contexts";

// Styles
import "@app/style/base/all.scss";
import "@app/style/components/Loader.scss";
import "@app/style/components/SearchBar.scss";
import "@app/style/themes/themes.scss";

ReactDOM.render(
  	<React.StrictMode>
		<MasterProvider>
			<Router>
				<App />	
			</Router>
		</MasterProvider>
  	</React.StrictMode>,
  	document.getElementById("root")
);