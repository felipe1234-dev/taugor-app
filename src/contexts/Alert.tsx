import React, { useState } from "react";
import { Severity } from "@local/types";

export interface AlertValue {
    message: string|null,
    setMessage(msg: string|null): void,
    severity: Severity|null,
    setSeverity(severity: Severity|null): void 
};

export const AlertContext = React.createContext<AlertValue>({
    message: null,
    setMessage: () => {},
    severity: null,
    setSeverity: () => {}
});

export function AlertProvider(props: { children: React.ReactNode }) {
	const [message, setMessage]   = useState<string|null>(null);
    const [severity, setSeverity] = useState<Severity|null>("error");
    
    return (
        <AlertContext.Provider value={{
            message,
            setMessage,
            severity,
            setSeverity
        }}>
            {props.children}
        </AlertContext.Provider>
    );
}