import { Timestamp } from "firebase/firestore";
import { Location } from "react-router-dom";
import { 
    WhereClasule, 
    OrderByClasule, 
    Status, 
    Environment,
    Priority,
    Severity,
    Influence,
    Tag
} from "@local/types";

export interface User {
    uuid: string,
    displayName: string, 
    photoURL?: string
};

export interface Task {
    uuid: string,
    title: Array<string>,
    description: string,
    postedBy: string,
    brief: string,  
    tags: Array<Tag>,
    attachments: Array<string>, 
    priority: Priority, 
    influencedUsers: Influence,
    product: string,
    environment: Environment,
    status: Status,
    createdAt: Timestamp
};

export interface Timeline {
    [key: string]: Array<Task>
};

export interface Filter {
    where?: Array<WhereClasule>,
    orderBy?: Array<OrderByClasule>,
    limit?: number,
    startAfter?: string
};

export interface File {
    name: string,
    type: "pdf" | "txt",
    url : string
};

export interface RouteState { 
    from?: Location, 
    background?: Location, 
    enableLoader?: boolean
};

export interface Alert { 
    severity: Severity,
    message: string
};