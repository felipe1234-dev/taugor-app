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
import { FirebaseError } from "@firebase/util";
import { Filter, Task } from "@local/interfaces";
import { OrderByClasule, WhereClasule } from "@local/types";
import toAlert from "@local/api/toAlert";

export default function getTasks(db: Firestore, filter: Filter): Promise<Array<Task>> {
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
            const docRef  = doc(db, "Tasks", filter.startAfter);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                lastVisible = [ startAfter(docSnap) ];
            }
        }
        
        const q = query(
            collection(db, "Tasks"), 
            ...conditions,
            ...orders,
            ...lastVisible,
            limit(filter.limit? filter.limit : 10)
        );
        
        try {
            const resp = await getDocs(q);
            
            const docs: Array<Task> = resp.docs.map((doc: any) => {
                return ({
                    uuid: doc.id,
                    ...doc.data()
                });
            });
            
            resolve(docs);
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};