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

// Page components 
import FilterSelector from "./FilterSelector";

// Interfaces
import { Filter } from "@local/interfaces";

// Props interface
interface HeaderProps {
    filter: Filter,
    setFilter(params: Filter): void
}

export default function Header({ filter, setFilter }: HeaderProps) {
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
    
    const filterSelector = { setFilter, filter }
    
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
                        <FilterSelector {...filterSelector}/>
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