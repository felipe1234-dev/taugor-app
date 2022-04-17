import { 
    Firestore, 
    doc, 
    getDoc 
} from "firebase/firestore";
import { User } from "@local/interfaces";

export const getUserByUuid = async (db: Firestore, uuid: string): Promise<User|null> => {
    const docRef  = doc(db, "Users", uuid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { uuid, ...docSnap.data() } as User;
    }
    
    console.error("User does not exist");
    
    return null;
};