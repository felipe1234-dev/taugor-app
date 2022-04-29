// Libs
import React from "react";

// Contexts
import { TimelineProvider, FilterProvider } from "./index";

export default function MasterProvider(props: { children: React.ReactNode }) {
    return (
        <FilterProvider>
            <TimelineProvider>
                {props.children}
            </TimelineProvider>
        </FilterProvider>
    );
}