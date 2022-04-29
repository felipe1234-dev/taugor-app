// Libs
import { useContext } from "react";
import {
    AppBar,
    Toolbar,
    Box
} from "@mui/material";

// Contexts
import { UserContext } from "@local/contexts";

// Navbar components
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

// Hooks
import { useOnScroll } from "@local/hooks";

export default function Navbar() {
    const hideAppBar = useOnScroll(300);
    const { user } = useContext(UserContext);

    return (
        <AppBar
            className="HomePage-navbar"
            component="nav"
            position="sticky"
            elevation={0}
            style={{ top: hideAppBar ? "-60px" : "0" }}
        >
            <Toolbar>
                <LeftSide />

                <Box flexGrow={1} />

                {!!user && (
                    <RightSide {...user} />
                )}
            </Toolbar>
        </AppBar>
    );
};