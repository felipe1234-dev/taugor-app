import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { Severity } from "@local/types";

interface AlertMessageProps {
    open?: boolean,
    type?: Severity,
    children?: React.ReactNode,
    message?: string, 
    duration?: number,
    onClose?: Function
};

export default function AlertMessage({
    open = true,
    type = "error",
    children,
    message,
    duration = 3000,
    onClose
}: AlertMessageProps) {
    const handleOnClose = (...params: Array<any>) => {
        if (onClose) {
            onClose(params);
        }
    }
    
    const snackBar = {
        open: open,
        autoHideDuration: duration,
        onClose: handleOnClose
    }
    
    const alert = {
        severity: type,
        sx: { width: "100%" },
        onClose: handleOnClose
    }
    
    return (
        <Snackbar {...snackBar}>
            <Alert {...alert}>
                {message && message}
                {children && children}
            </Alert>
        </Snackbar>
    );
};