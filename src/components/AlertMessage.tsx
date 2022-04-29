import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { Severity } from "@local/types";

export interface AlertMessageProps {
    open?: boolean,
    type?: Severity,
    children?: React.ReactNode,
    message?: string|null, 
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
    
    return (
        <Snackbar
            onClose={handleOnClose}
            autoHideDuration={duration}
            open={open}
        >
            <Alert
                severity={type}
                sx={{ width: "100%" }}
                onClose={handleOnClose}
            >
                {message && message}
                {children && children}
            </Alert>
        </Snackbar>
    );
};