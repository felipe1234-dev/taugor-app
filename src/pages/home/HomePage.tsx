// Libs
import { 
    useState,
    useEffect,
    useContext
} from "react";
import { FirebaseError } from "firebase/app";

// Page components
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

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
    const [timeline, setTimeline]   = useState<Timeline>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter]       = useState<Filter>({
        orderBy: [
            ["createdAt", "desc"]
        ],
        limit: 30
    });
    
    const { db }   = useContext(FirebaseContext);
    
    useEffect(() => {
        setIsLoading(true);
        
        getActivities(db, filter)
            .then((resp: any) => {
                const docs: Array<Task> = resp.docs.map((doc: any) => {
                    return ({
                        uuid: doc.id,
                        ...doc.data()
                    });
                });
                
                const grouped = groupDocsByTime(docs);
                
                setTimeline(grouped);
            })
            .catch((error: FirebaseError) => console.log(error))
            .then(() => setTimeout(() => setIsLoading(false), 5000));
    }, [db, filter]);
    
    const navbar = { filter, setFilter }
    
    const body = { isLoading, timeline, filter, setFilter }
    
    return (
        <>
            <Navbar {...navbar}/>
            <Header />
            <Body {...body}/>
        </> 
    );
};