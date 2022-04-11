// Libs
import React, {
    useState, 
    useEffect, 
    useContext 
} from "react";
import { 
    Grid, 
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import {
    CreateTwoTone as PencilIcon
} from "@material-ui/icons";

// Contexts
import { UserContext } from "@app/contexts";

function Header() {
    const [greeting, setGreeting] = useState("Olá");
    const [user] = useContext(UserContext);
    const { displayName } = user;
    
    useEffect(() => {
        const hours = new Date().getHours();
        let message = ""; 
        
        if (hours <= 12 && hours >= 6) {
            message = "Bom dia";
        }
        
        if (hours < 6 && hours >= 0) {
            message = "Hora de dormir";
        }
        
        if (hours > 12 && hours <= 18) {
            message = "Boa tarde";
        }
        
        if (hours > 18 && hours <= 24) {
            message = "Boa noite";
        }
        
        setGreeting(message);
    }, []);
    
    const props = {
        container: {
			className: "HomePage-header",
			component: "header",
            container: true,
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }, 
        greeting: {
            className: "HomePage-header-greeting",
            variant: "h3"
        },
        displayName: {
            className: "HomePage-header-displayName",
            variant: "h2"
        },
        tooltip: {
            title: "Adicionar uma atividade"
        },
        addActivity: {
            className: "HomePage-header-addActivButton",
            variant: "contained"
        }
    }
    
    return (
        <Grid {...props.container}>
            <Grid item> 
                <Typography {...props.greeting}>
                    {greeting},
                </Typography>
                <Typography {...props.displayName}>
                    {displayName}<span style={{ opacity: ".5" }}>!</span>
                </Typography> 
            </Grid>
            <Grid item>
                <Tooltip {...props.tooltip}>
                    <IconButton {...props.addActivity}>
                        <PencilIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

export default Header;