// Libs
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

// Components
import App from "./App";

// Providers
import { MasterProvider } from "@local/contexts";

// Styles
import "@local/style/base/all.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <MasterProvider>
        <Router>
            <App />
        </Router>
    </MasterProvider>
);