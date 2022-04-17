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
import { useLocation, useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

// Local components
import { Spinner } from "@local/components";

// API functions
import { login, onError } from "@local/api/auth/sign-in";

// Contexts
import { AlertContext } from "@local/contexts";

export default function LoginForm() {
    const [formIsLoading, setFormIsLoading]       = useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);
    const [passIsMasked, setPassIsMasked]         = useState<boolean>(true);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from     = location.state?.from?.pathname as string || "/";
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    const onSubmit = (event: any) => {
        event.preventDefault(); 
        // Previne que a página seja recarregada ou redirecionada.
        
        if (submitIsDisabled) {
            return;
        }
        
        setFormIsLoading(true);
        
        const data     = new FormData(event.currentTarget);
        const email    = data.get("password")?.toString() || "";
        const password = data.get("password")?.toString() || "";
        
        login(email, password)
            .then((response: any) => {
                sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
                sessionStorage.setItem("Assign Date", (new Date().getTime()).toString());
                navigate(from, { replace: true });
            })
            .catch((error: FirebaseError) => {
                const errData = onError(error);
                setMessage(errData.message);
                setSeverity(errData.severity);
            })
            .then(() => setTimeout(() => setFormIsLoading(false), 2000));
    } 
    
    const onChange = (event: any) => {
        const data = new FormData(event.currentTarget);
        setSubmitIsDisabled(
            !!data.get("email") && !!data.get("password")
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
    
    const paswordTextField = {
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
        className: `LoginPage-loginButton${formIsLoading ? " is-loading" : ""}`,
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
            width: "100%",
            height: "100%"
        },
        spinner: {
            width: "1em",
            height: "1em",
            barColor: "var(--light)",
            pathColor: "var(--pale)"
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
                {...paswordTextField} 
            />
            <Button {...loginButton}>
                <span>Entrar</span>
                <Spinner {...spinner}/>
            </Button>
        </Box>
    );
}