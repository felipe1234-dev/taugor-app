import { 
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc,
    startAfter,
    Firestore,
    QueryConstraint
} from "firebase/firestore";
import { Filter, Task } from "@local/interfaces";
import { 
    Alert, 
    OrderByClasule, 
    WhereClasule 
} from "@local/types";
import toAlert from "@local/api/toAlert";

export default function getActivities(db: Firestore, filter: Filter): Promise<Array<Task>|Alert> {
    return new Promise(async (resolve, reject) => {
        let conditions: Array<QueryConstraint>  = [];
        let orders: Array<QueryConstraint>      = [];
        let lastVisible: Array<QueryConstraint> = [];
        
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
        
        if (filter.startAfter) {
            const docRef  = doc(db, "Activities", filter.startAfter);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                lastVisible = [ startAfter(docSnap) ];
            }
        }
        
        const q = query(
            collection(db, "Activities"), 
            ...conditions,
            ...orders,
            ...lastVisible,
            limit(filter.limit? filter.limit : 10)
        );
            
        getDocs(q)
            .then((resp) => {
                const docs: Array<Task> = resp.docs.map((doc: any) => {
                    return ({
                        uuid: doc.id,
                        ...doc.data()
                    });
                });
                
                resolve(docs);
            })
            .catch((error) => (
                reject(toAlert(error))
            ));
    });
};