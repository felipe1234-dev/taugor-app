// Libs
import { useContext } from "react";
import { Grid } from "@mui/material";

// Heading components 
import Heading from "./Heading";
import Actions from "./Actions";

// Contexts
import { UserContext } from "@local/contexts";

export default function Header() {
    const { user } = useContext(UserContext);
    
    return (
        <Grid 
            container
            className="HomePage-header"
            component="header"
            sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            {!!user && (
                <>
                    <Heading {...user}/>
                    <Actions />
                </>
            )}
        </Grid>
    );
};