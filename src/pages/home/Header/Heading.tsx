// Libs
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

// Interfaces
import { User } from "@local/interfaces";

export default function Heading(user: User) {
    const [helloMsg, setHelloMsg] = useState<string>("Olá");

    useEffect(() => {
        const hours = new Date().getHours();
        let message = "";

        if (hours >= 6 && hours <= 12) {
            message = "Bom dia";
        }

        if (hours > 12 && hours <= 18) {
            message = "Boa tarde";
        }

        if (hours > 18 && hours <= 24) {
            message = "Boa noite";
        }

        if (hours >= 0 && hours < 6) {
            message = "Hora de dormir";
        }

        setHelloMsg(message);
    }, []);
    
    return (
        <Grid item>
            <Typography         
                className="HomePage-header-greeting"
                variant="h3"
            >
                {helloMsg},
            </Typography>
            <Typography                
                className="HomePage-header-displayName"
                variant="h2"
            >
                {user.displayName}<span style={{ opacity: ".5" }}>!</span>
            </Typography>
        </Grid>
    );
}