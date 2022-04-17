import React, { useState, createContext } from "react";

export interface PageValue {
    pathname: string,
    setPathname(pathname: string): void,
    isLoading: boolean,
    setIsLoading(isLoading: boolean): void
};

export const PageContext = createContext<PageValue>({
    pathname: "/",
    setPathname: () => {},
    isLoading: false, 
    setIsLoading: () => {}
});

export function PageProvider(props: { children: React.ReactNode }) {
    const [pathname, setPathname]   = useState<string>("/");
	const [isLoading, setIsLoading] = useState<boolean>(true); 
    
    return (
        <PageContext.Provider value={{ pathname, setPathname, isLoading, setIsLoading }}>
            {props.children}
        </PageContext.Provider>
    );
};