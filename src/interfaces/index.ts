import { Timestamp } from "firebase/firestore";
import { 
    WhereClasule, 
    OrderByClasule, 
    Status, 
    Environment,
    Priority
} from "@local/types";

export interface Page {
    title: string
}; 

export interface User {
    uuid: string, 
    displayName: string, 
    photoURL?: string,
    email: string
};

export interface Task {
    uuid: string,
    title: Array<string>,
    description: string,
    postedBy: string,
    brief: string,  
    tags: Array<string>,
    attachments: Array<string>, 
    priority: Priority, 
    influencedUsers: "1-10" | "11-30" | "31-50" | "50+", 
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
    startAt?: number
};

export interface File {
    name: string,
    type: "pdf" | "txt",
    url : string
};