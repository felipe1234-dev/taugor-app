// Libs
import {
    useState,
    useEffect,
    useContext,
    useRef
} from "react";

// Page components
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

// Hooks
import { useOnScreen } from "@local/hooks";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { getActivities } from "@local/api/collections/Activities";

// Functions
import { groupDocsByTime } from "@local/functions";

// Interfaces
import { Filter, Timeline } from "@local/interfaces";

// Style
import "@local/style/pages/HomePage.scss";

export default function HomePage() {
    const [timeline, setTimeline] = useState<Timeline>({});
    const [lastVisible, setLastVisible] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<Filter>({
        orderBy: [
            ["createdAt", "desc"]
        ],
        limit: 30
    });

    const { db } = useContext(FirebaseContext);
    const { setSeverity, setMessage } = useContext(AlertContext);

    const loaderRef = useRef<HTMLDivElement>(null);
    const loaderIsOnScreen = useOnScreen(loaderRef, [timeline, isLoading]);

    const fetchActivities = (accum: boolean) => {
        if (!accum) {
            setIsLoading(true);
        }

        getActivities(db, !!lastVisible && accum ? { ...filter, startAfter: lastVisible } : filter)
            .then((docs) => {
                setHasNextPage(docs.length > 0);

                const grouped = groupDocsByTime(docs);
                setTimeline(accum ? { ...timeline, ...grouped } : grouped);
            })
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            })
            .then(() => {
                if (!accum) {
                    setTimeout(() => setIsLoading(false), 5000);
                }
            });
    }

    useEffect(() => {
        setLastVisible(null);
        fetchActivities(false);
    }, [db, filter]);

    useEffect(() => {
        if (hasNextPage && loaderIsOnScreen) {
            const timestamps = Object.keys(timeline);
            const oldest = timestamps.at(-1);
            const lastTask = timeline[oldest!].at(-1);

            setLastVisible(lastTask!.uuid);
            fetchActivities(true);
        }
    }, [db, loaderIsOnScreen]);

    const navbar = {
        filter,
        setFilter
    }

    const header = {
        filter,
        setFilter
    }

    const body = {
        loaderRef,
        isLoading,
        timeline
    }

    return (
        <>
            <Navbar {...navbar} />
            <Header {...header} />
            <Body {...body} />
        </>
    );
};