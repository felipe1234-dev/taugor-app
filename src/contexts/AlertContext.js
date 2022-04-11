import React, { useState, createContext } from "react";

const AlertContext = createContext([]);

function AlertProvider({ children }) {
	const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("error");
    
    return (
        <AlertContext.Provider value={{
            message: message,
            setMessage: setMessage,
            severity: severity,
            setSeverity: setSeverity
        }}>
            {children}
        </AlertContext.Provider>
    );
}

export { AlertContext, AlertProvider };