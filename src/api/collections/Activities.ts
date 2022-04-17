import { 
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc,
    startAt,
    Firestore
} from "firebase/firestore";
import { Filter, Task } from "@local/interfaces";
import { OrderByClasule, WhereClasule } from "@local/types";

export const getActivities = async(db: Firestore, filter: Filter) => {
    let conditions: Array<any> = [];
    let orders: Array<any>     = [];
    
    if (filter.where) {
        conditions = filter.where.map((params: WhereClasule) => {
            return where(...params);
        });
    }
    
    if (filter.orderBy) {
        orders = filter.orderBy.map((params: OrderByClasule) => {
            return orderBy(...params);
        });
    }
    
    const q = query(
        collection(db, "Activities"), 
        ...conditions,
        ...orders,
        limit(filter.limit? filter.limit : 10),
        startAt(filter.startAt? filter.startAt : 0)
    );
        
    const queryPromise = await getDocs(q);
        
    return queryPromise;
};

export const getActivityByUuid = async (db: Firestore, uuid: string): Promise<Task|null> => {
    const docRef  = doc(db, "Activities", uuid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { uuid, ...docSnap.data() } as Task;
    }
    
    console.error("Activity does not exist");
    
    return null;
};