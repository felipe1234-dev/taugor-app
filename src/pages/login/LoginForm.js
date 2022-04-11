// Libs
import React, { useState, useContext } from "react";
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

// Firebase API functions
import { login } from "@app/auth";

// Contexts
import { PageContext, AlertContext } from "@app/contexts";

function LoginForm() {
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState(false);
    const [passIsMasked, setPassIsMasked] = useState(true);
    
    const [, setPageIsLoading] = useContext(PageContext);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    const onSubmit = (event) => {
        event.preventDefault(); 
        // Previne que a página seja recarregada ou redirecionada.
        
        if (submitIsDisabled) {
            return;
        }
        
        setFormIsLoading(true);
        
        const data = new FormData(event.currentTarget);
        
        login(data.get("email"), data.get("password"))
        .then((response) => {
            sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
            sessionStorage.setItem("Assign Date", new Date().getTime());
            setPageIsLoading(true);
        })
        .catch((error) => {
            if (error.code === "auth/wrong-password") {
                setMessage("Sem resultados :( Tente verificar sua senha");
            } else if (error.code === "auth/user-not-found") {
                setMessage("Sem resultados :( Tente verificar seu email");
            } else {
                setMessage(`Erro desconhecido. Contacte o desenvolvedor: ${error.code}`);
            }
            
            setSeverity("error");
        })
        .then(() => setTimeout(() => setFormIsLoading(false), 2000));
    }
    
    const onChange = (event) => {
        const data = new FormData(event.currentTarget);
        setSubmitIsDisabled(
            !(data.get("email") && data.get("password"))
        );
    }
    
    const props = {
        form: {
            onSubmit: onSubmit,
            onChange: onChange,
            component: "form", 
            sx: { mt: 1 }
        },
        baseTextField: {
            margin: "normal",
            fullWidth: true,
            required: true,
            variant: "standard"
        },
        emailTextField: {
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
        },
        paswordTextField: {
            name: "password",
            label: "Senha", 
            type: passIsMasked? "password" : "text",
            defaultValue: "12345",
            InputProps: {
                autoComplete: "new-password",
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setPassIsMasked(prevState => !prevState)}>
                            {passIsMasked? <VisibilityOffIcon /> : <VisibilityOnIcon />}
                        </IconButton>
                    </InputAdornment>
                )
            }
        },
        loginButton: {
            className: `LoginPage-loginButton${formIsLoading? " is-loading" : ""}`,
            variant: "contained",
            type: "submit",
            disabled: submitIsDisabled,
            fullWidth: true,
            sx: { mt: 3, mb: 2 },
            disableElevation: true
        },
        spinner: {
            className: "Spinner"
        }
    }
     
    return (
        <Box {...props.form}>
            <TextField 
                {...props.baseTextField} 
                {...props.emailTextField} 
            />
            <TextField
                {...props.baseTextField} 
                {...props.paswordTextField} 
            />
            <Button {...props.loginButton}>
                <span>Entrar</span>
                <div {...props.spinner}></div>
            </Button>
        </Box>
    );
}

export default LoginForm;