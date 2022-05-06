class QueryParams extends URLSearchParams {
    updateURL(): void {
        const currURL   = (window.location.href).replace(/\?.*?$/, "");
        const queries   = super.toString();
        const nextURL   = `${currURL}${!!queries ? "?" + queries : ""}`;
        const nextTitle = document.body.title;
        const nextState = { enableLoader: false };

        window.history.pushState(nextState, nextTitle, nextURL);
    }
    
    append(name: string, value: string): void {
        super.append(name, value);
        this.updateURL();
    }
     
    delete(name: string): void {  
        super.delete(name);
        this.updateURL();
    }

    set(name: string, value: string): void {
        super.set(name, value);
        this.updateURL();
    }
};

export default function useQueryParams() {
    const url         = new URL(window.location.href);
    const queryParams = new QueryParams(url.search);
    
    return queryParams
};