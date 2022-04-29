// Libs
import {
    useContext,
    useEffect,
    useRef
} from "react";

// Page components
import { MasterProvider } from "./contexts";
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

// Hooks
import { useOnScreen } from "@local/hooks";

// Contexts
import { TimelineContext, FilterContext } from "./contexts";
import { FirebaseContext } from "@local/contexts";

// Style
import "@local/style/pages/HomePage.scss";

function Home() {
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
        if (loaderIsOnScreen) {
            updateTimeline(filter, "add");
        }
    }, [db, loaderIsOnScreen]);

    return (
        <>
            <Navbar />
            <Header />
            <Body loaderRef={loaderRef}/>
        </>
    );
}

export default function HomePage() {
    return (
        <MasterProvider>
            <Home />
        </MasterProvider>
    );
}