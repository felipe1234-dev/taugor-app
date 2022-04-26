import { 
    Firestore, 
    doc, 
    getDoc 
} from "firebase/firestore";
import { User } from "@local/interfaces";

export default function getUserByUuid(db: Firestore, uuid: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Users", uuid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            resolve({ 
                uuid, 
                ...docSnap.data() 
            } as User); 
        } else {
            reject({
                severity: "error",
                message: "Usuário não existe"
            });
        }
    });
};