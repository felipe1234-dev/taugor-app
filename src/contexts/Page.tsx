import React, { useState, createContext } from "react";

export interface PageValue {
    isLoading: boolean,
    setIsLoading(isLoading: boolean): void
};

export const PageContext = createContext<PageValue>({ 
    isLoading: false, 
    setIsLoading: () => {}
});

export function PageProvider(props: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState<boolean>(true); 
    
    return (
        <PageContext.Provider value={{ isLoading, setIsLoading }}>
            {props.children}
        </PageContext.Provider>
    );
};