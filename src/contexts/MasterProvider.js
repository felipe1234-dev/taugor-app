import React from "react";
import { FirebaseProvider } from "./FirebaseContext";
import { PageProvider } from "./PageContext";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";
import { AlertProvider } from "./AlertContext";

const ProviderCompose = ({ providers, children }) => (
    <>
        {providers.reduceRight((acc, Prov) => (
            <Prov>{acc}</Prov>
        ), children)}
    </>
)

function MasterProvider({ children }) {
    const providers = [
        FirebaseProvider,
        PageProvider,
        UserProvider,
        ThemeProvider,
        AlertProvider
    ];
    
    return (
        <ProviderCompose providers={providers}>
            {children}
        </ProviderCompose>
    );
}

export default MasterProvider;