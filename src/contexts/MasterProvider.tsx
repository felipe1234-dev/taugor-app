import { ReactNode } from "react";
import { FirebaseProvider } from "./Firebase";
import { PageProvider } from "./Page";
import { UserProvider } from "./User";
import { ThemeProvider } from "./Theme";
import { AlertProvider } from "./Alert";

interface ProviderComposeProps {
    providers: Array<Function>, 
    children: ReactNode
}

const ProviderCompose = (props: ProviderComposeProps) => (
    <>
        {props.providers.reduceRight((acc, Prov) => (
            <Prov>{acc}</Prov>
        ), props.children)}
    </>
)

export const MasterProvider = (props: { children: ReactNode }) => (
    <ProviderCompose providers={[
        FirebaseProvider,
        PageProvider,
        UserProvider,
        ThemeProvider,
        AlertProvider
    ]}>
        {props.children}
    </ProviderCompose>
);