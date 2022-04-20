// Libs
import { 
    useState,
    useEffect,
    useContext,
    useRef
} from "react";
import { FirebaseError } from "firebase/app";

// Page components
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

// Hooks
import { useOnScreen } from "@local/hooks";

// Contexts
import { FirebaseContext } from "@local/contexts";

// API
import { getActivities } from "@local/api/collections/Activities";

// Functions
import { groupDocsByTime } from "@local/functions";

// Interfaces
import {
    Filter,
    Task,
    Timeline
} from "@local/interfaces";

// Style
import "@local/style/pages/HomePage.scss";

export default function HomePage() {
    const [timeline, setTimeline]       = useState<Timeline>({});
    const [lastVisible, setLastVisible] = useState<string|null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [isLoading, setIsLoading]     = useState<boolean>(false);
    const [filter, setFilter]           = useState<Filter>({
        orderBy: [
            ["createdAt", "desc"]
        ],
        limit: 30
    });
    
    const { db }   = useContext(FirebaseContext);

    const loaderRef        = useRef<HTMLDivElement>(null);
    const loaderIsOnScreen = useOnScreen(loaderRef, [timeline, isLoading]);
    
    const fetchActivities = () => {
        if (!lastVisible) {
            setIsLoading(true);
        }
        
        console.log(lastVisible)
        
        getActivities(db, !!lastVisible? { ...filter, startAfter: lastVisible } : filter)
            .then((resp: any) => {
                const docs: Array<Task> = resp.docs.map((doc: any) => {
                    return ({
                        uuid: doc.id,
                        ...doc.data()
                    });
                });
            
                setHasNextPage(docs.length > 0);
                
                const grouped = groupDocsByTime(docs);
                setTimeline(!!lastVisible? { ...timeline, ...grouped } : grouped);
            })
            .catch((error: FirebaseError) => console.log(error))
            .then(() => {
                if (!lastVisible) {
                    setTimeout(() => setIsLoading(false), 5000);
                }
            });
    }
    
    useEffect(() => {
        setLastVisible(null);
        fetchActivities();
    }, [db, filter]);
    
    useEffect(() => {
        if (hasNextPage && loaderIsOnScreen) {
            const timestamps = Object.keys(timeline);
            const oldest     = timestamps.at(-1);
            const lastTask   = timeline[oldest!].at(-1);
            
            setLastVisible(lastTask!.uuid);
            fetchActivities();
        }
    }, [db, loaderIsOnScreen]);
    
    const navbar = { 
        filter, 
        setFilter 
    }
    
    const body = {
        loaderRef, 
        isLoading, 
        timeline, 
        filter, 
        setFilter 
    }
    
    return (
        <>
            <Navbar {...navbar}/>
            <Header />
            <Body {...body}/>
        </> 
    );
};