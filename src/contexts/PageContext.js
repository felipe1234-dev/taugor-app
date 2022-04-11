import React, { useState, createContext } from "react";

const PageContext = createContext([]);

function PageProvider({ children }) {
	const [pageIsLoading, setPageIsLoading] = useState(true);
    
    return (
        <PageContext.Provider value={[pageIsLoading, setPageIsLoading]}>
            {children}
        </PageContext.Provider>
    );
}

export { PageContext, PageProvider };