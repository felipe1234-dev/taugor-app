import { 
    Firestore, 
    doc, 
    getDoc 
} from "firebase/firestore";
import { User } from "@local/interfaces";
import { Alert } from "@local/types";

export default function getUserByUuid(db: Firestore, uuid: string): Promise<User|Alert> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Users", uuid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            resolve({ 
                uuid, 
                ...docSnap.data() 
            } as User);
        }
        
        reject({
            severity: "error",
            message: "Usuário não existe"
        });
    });
};