// Todas as interações com a collection "Activities" serão aqui
import { 
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc
} from "firebase/firestore";

const getActivities = async (db, filters) => {
    const conditions = [];
    const orders     = [];
    
    if (filters.where) {
        filters.where.forEach(([ key, operator, value ]) => {
            conditions.push(where(key, operator, value));
        });
    }
    
    if (filters.orderBy) {
        filters.orderBy.forEach(([ field, direction ]) => {
            orders.push(orderBy(field, direction));
        });
    }
    
    if (filters.startAfter) {
        
    }
    
    const q = query(
        collection(db, "Activities"), 
        ...conditions,
        ...orders,
        limit(filters.limit? filters.limit : 10)
    );
        
    const queryPromise = await getDocs(q);
        
    return queryPromise;
}

const getActivityByUuid = async (db, uuid) => {
    const docRef  = doc(db, "Activities", uuid);
    const docSnap = await getDoc(docRef);
    
    return docSnap.data();
}

export { getActivities, getActivityByUuid };