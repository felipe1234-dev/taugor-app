// Libs
import {
    useContext,
    useEffect,
    useRef
} from "react";

// Page components
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

// Hooks
import { useOnScreen } from "@local/hooks";

// Contexts
import { 
    TimelineContext,
    TimelineProvider, 
    FilterContext,
    FilterProvider 
} from "./contexts";
import { FirebaseContext } from "@local/contexts";

// Style
import "@local/style/pages/HomePage.scss";

export default function HomePage() {
    const { filter } = useContext(FilterContext);
    const { db } = useContext(FirebaseContext);
    const {
        timeline,
        updateTimeline,
        isLoading
    } = useContext(TimelineContext);
    
    const loaderRef = useRef<HTMLDivElement>(null);
    const loaderIsOnScreen = useOnScreen(loaderRef, [timeline, isLoading]);
    
    useEffect(() => {
        updateTimeline(filter, "reset");
    }, [db, filter]);

    useEffect(() => {
        updateTimeline(filter, "add");
    }, [db, loaderIsOnScreen]);

    return (
        <FilterProvider>
            <TimelineProvider>
                <Navbar />
                <Header />
                <Body loaderRef={loaderRef}/>
            </TimelineProvider>
        </FilterProvider>
    );
}