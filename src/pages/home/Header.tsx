// Libs
import { 
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
} from "@mui/icons-material";

// Contexts
import { UserContext } from "@local/contexts";

export default function Header() {
    const [helloMsg, setHelloMsg] = useState<string>("Olá");
    
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        const hours = new Date().getHours();
        let message = ""; 
        
        if ( hours >= 6 && hours <= 12) {
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
    
    const container = {
		className: "HomePage-header",
		component: "header",
        container: true,
        sx: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }
    } 
    
    const greeting = {
        className: "HomePage-header-greeting",
        variant: "h3" as "h3"
    }
    
    const displayName =  {
        className: "HomePage-header-displayName",
        variant: "h2" as "h2"
    }
    
    const tooltip = {
        title: "Adicionar uma atividade"
    }
        
    const addActivity = {
        className: "HomePage-header-addActivButton",
        variant: "contained" as "contained"
    }
    
    return (
        <Grid {...container}>
            {!!user && (
                <>
                    <Grid item> 
                        <Typography {...greeting}>
                            {helloMsg},
                        </Typography>
                        <Typography {...displayName}>
                            {user.displayName}<span style={{ opacity: ".5" }}>!</span>
                        </Typography> 
                    </Grid>
                    <Grid item>
                        <Tooltip {...tooltip}>
                            <IconButton {...addActivity}>
                                <PencilIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </>
            )}
        </Grid>
    );
};