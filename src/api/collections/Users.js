import { doc, getDoc } from "firebase/firestore";

const getUserByUuid = async (db, uuid) => {
    const docRef  = doc(db, "Users", uuid);
    const docSnap = await getDoc(docRef);
    
    return docSnap.data();
}

export { getUserByUuid };