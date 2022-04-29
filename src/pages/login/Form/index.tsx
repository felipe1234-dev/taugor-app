// Libs
import { useState, useContext } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material";
import { TextFieldProps } from "@mui/material";
import {
    MailOutline as MailOutlineIcon, 
    Visibility as VisibilityOnIcon,
    VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

// Local components
import { Spinner } from "@local/components";

// Local functions
import { isRouteState } from "@local/functions";

// API functions
import { logIn } from "@local/api/auth";

// Contexts
import { AlertContext } from "@local/contexts";

export default function Form() {
    const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);
    const [passIsMasked, setPassIsMasked] = useState<boolean>(true);
    
    const navigate  = useNavigate();
    const { state, pathname: pathNow } = useLocation();
    let from = "/";
    
    if (isRouteState(state) && "from" in state) {
        if (state.from!.pathname !== pathNow) {
            from = state.from!.pathname;
        }
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
            .then(() => {
                setSeverity("success");
                setMessage("Login feito com sucesso");
                setTimeout(() => navigate(from, { replace: true }), 3000);
            })
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
    
    const baseTextField: TextFieldProps = {
        margin: "normal",
        fullWidth: true,
        required: true,
        variant: "standard"
    }
     
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            onChange={onChange}
            sx={{ mt: 1 }}
        >
            <TextField 
                {...baseTextField}
                name="email"
                label="Email"
                type="email"
                defaultValue="Seu email"
                InputProps={{
                    endAdornment: (
                        <InputAdornment style={{ padding: "12px" }} position="end">
                            <MailOutlineIcon />
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                {...baseTextField}
                name="password"
                label="Senha"
                type={passIsMasked ? "password" : "text"}
                defaultValue="12345"
                InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setPassIsMasked(prevState => !prevState)}>
                                {passIsMasked ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Button
                className={`LoginPage-loginButton${formIsLoading ? " isLoading" : ""}`}
                variant="contained"
                type="submit"
                disabled={submitIsDisabled}
                disableElevation
                fullWidth
                sx={{ mt: 3, mb: 2 }}
            >
                <span>Entrar</span>
                <Spinner
                    wrapper={{
                        minWidth: "100%",
                        minHeight: "100%"
                    }}
                    
                    spinner={{
                        minWidth: "1em",
                        minHeight: "1em"
                    }}
                />
            </Button>
        </Box>
    );
};