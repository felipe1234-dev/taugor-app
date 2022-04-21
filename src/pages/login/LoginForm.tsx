// Libs
import { useState, useContext } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material";
import {
    MailOutline as MailOutlineIcon, 
    Visibility as VisibilityOnIcon,
    VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import {
    Location, 
    useLocation, 
    useNavigate 
} from "react-router";

// Local components
import { Spinner } from "@local/components";

// API functions
import { logIn } from "@local/api/auth";

// Contexts
import { AlertContext } from "@local/contexts";

interface RouteState { from: Location };

const isLocation = (object: any): object is Location => {
    return (
        ("pathname" in object && typeof object.pathname === "string") &&
        ("search" in object && typeof object.search === "string") &&
        ("hash" in object && typeof object.hash === "string") &&
        ("key" in object && typeof object.key === "string")
    );
};

const isRouteState = (object: any): object is RouteState => {
    return (
        !!object && 
        (object as RouteState).from !== undefined 
        && isLocation((object as RouteState).from)
    );
};

export default function LoginForm() {
    const [formIsLoading, setFormIsLoading]       = useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);
    const [passIsMasked, setPassIsMasked]         = useState<boolean>(true);
    
    const navigate  = useNavigate();
    const { state, pathname: pathNow } = useLocation();
    let from = "/";

    if (isRouteState(state)) { 
        from = state.from.pathname === pathNow? "/" : state.from.pathname;
    }
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    const onSubmit = (event: any) => {
        event.preventDefault(); 
        // Previne que a página seja recarregada ou redirecionada.
        
        if (submitIsDisabled) {
            return;
        }
        
        setFormIsLoading(true);
        
        const data     = new FormData(event.currentTarget);
        const email    = data.get("email")?.toString() || "";
        const password = data.get("password")?.toString() || "";
        
        logIn(email, password)
            .then(() => (
                navigate(from, { replace: true })
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            })
            .then(() => {
                setTimeout(() => setFormIsLoading(false), 3000);
            });
    } 
    
    const onChange = (event: any) => {
        const data = new FormData(event.currentTarget);
        setSubmitIsDisabled(
            !data.get("email") || !data.get("password")
        );
    }
    
    const form = {
        onSubmit: onSubmit,
        onChange: onChange,
        component: "form" as "form",
        sx: { mt: 1 }
    }
    
    const baseTextField = {
        margin: "normal" as "normal",
        fullWidth: true,
        required: true,
        variant: "standard" as "standard"
    }
    
    const emailTextField = {
        name: "email",
        label: "Email",
        type: "email",
        defaultValue: "Seu email",
        InputProps: {
            endAdornment: (
                <InputAdornment style={{ padding: "12px" }} position="end">
                    <MailOutlineIcon />
                </InputAdornment>
            )
        }
    }
    
    const passwordTextField = {
        name: "password",
        label: "Senha",
        type: passIsMasked ? "password" : "text",
        defaultValue: "12345",
        InputProps: {
            autoComplete: "new-password",
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setPassIsMasked(prevState => !prevState)}>
                        {passIsMasked ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
                    </IconButton>
                </InputAdornment>
            )
        }
    }
    
    const loginButton = {
        className: `LoginPage-loginButton${formIsLoading ? " isLoading" : ""}`,
        variant: "contained" as "contained",
        component: "button" as "button",
        type: "submit" as "submit",
        disabled: submitIsDisabled,
        fullWidth: true,
        sx: { mt: 3, mb: 2 },
        disableElevation: true
    }
    
    const spinner = {
        wrapper: {
            minWidth: "100%",
            minHeight: "100%"
        },
        spinner: {
            minWidth: "1em",
            minHeight: "1em"
        }
    }
     
    return (
        <Box {...form}>
            <TextField 
                {...baseTextField} 
                {...emailTextField} 
            />
            <TextField
                {...baseTextField} 
                {...passwordTextField} 
            />
            <Button {...loginButton}>
                <span>Entrar</span>
                <Spinner {...spinner}/>
            </Button>
        </Box>
    );
};