// Libs
import React, { useState, useContext } from "react"; 

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// Interfaces
import { Filter, Timeline } from "@local/interfaces";

// Functions
import { groupDocsByTime } from "@local/functions";

// Hooks
import { useOnScreen } from "@local/hooks";

// API
import { getActivities } from "@local/api/collections/Activities";

export interface TimelineValue {
    timeline: Timeline,
    updateTimeline(filter: Filter, mode: "add"|"reset"): void,
    isLoading: boolean
};

export const TimelineContext = React.createContext<TimelineValue>({
    timeline: {},
    updateTimeline: () => {},
    isLoading: false
});

export function TimelineProvider(props: { children: React.ReactNode }) {
    const [timeline, setTimeline]       = useState<Timeline>({});
    const [lastVisible, setLastVisible] = useState<string|null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [isLoading, setIsLoading]     = useState<boolean>(false);

    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db }                      = useContext(FirebaseContext);

    const fetchTasks = (filter: Filter, add: boolean) => {
        if (!add) {
            setIsLoading(true);
        }

        getActivities(db, 
            (!!lastVisible && add) ? (
                { ...filter, startAfter: lastVisible } 
            ) : (
                filter
            )
        )
            .then((docs) => {
                setHasNextPage(docs.length > 0);

                const grouped = groupDocsByTime(docs);
                setTimeline(add ? { ...timeline, ...grouped } : grouped);
            })
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            })
            .then(() => {
                if (!add) {
                    setTimeout(() => setIsLoading(false), 5000);
                }
            });
    }
    
    const updateTimeline = (filter: Filter, mode: "add"|"reset" = "add") => {
        if (mode === "add" && hasNextPage) {
            const timestamps = Object.keys(timeline);
            const oldest = timestamps.at(-1);
            const lastTask = timeline[oldest!].at(-1);

            setLastVisible(lastTask!.uuid);
            fetchTasks(filter, true);
        } else if (mode === "reset") {
            setLastVisible(null);
            fetchTasks(filter, false);
        }
    }
    
    return (
        <TimelineContext.Provider value={{ timeline, updateTimeline, isLoading }}>
            {props.children}
        </TimelineContext.Provider>
    );
};