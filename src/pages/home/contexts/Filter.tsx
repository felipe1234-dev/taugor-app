import React from "react";
import { Filter } from "@local/interfaces";

export interface FilterValue {
    filter: Filter,
    setFilter(newFilter: Filter): void
};

export const FilterContext = React.createContext<FilterValue>({
    filter: {},
    setFilter: () => {}
});

export function FilterProvider(props: { children: React.ReactNode }) {
    const [filter, setFilter] = React.useState<Filter>({
        orderBy: [
            ["createdAt", "desc"]
        ],
        limit: 30
    });
    
    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {props.children}
        </FilterContext.Provider>
    );
};