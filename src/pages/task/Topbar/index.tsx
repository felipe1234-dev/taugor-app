// Libs
import { useContext } from "react";
import {
    Box,
    AppBar,
    Toolbar
} from "@mui/material";

// Topbar components
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

// Contexts
import { UserContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

export default function Topbar(task: Task) {
    const { user } = useContext(UserContext);

    return (
        <AppBar
            component="nav"
            className="TaskPage-topbar"
            position="sticky"
            elevation={0}
        >
            <Toolbar>
                <LeftSide />
                <Box flexGrow={1} />
                {(!!user && task.postedBy === user.uuid) && (
                    <RightSide {...task}/>
                )}
            </Toolbar>
        </AppBar>
    );
}