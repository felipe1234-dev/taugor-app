import { FirebaseError } from "firebase/app";
import { 
    Firestore, 
    doc, 
    getDoc 
} from "firebase/firestore";
import { User } from "@local/interfaces";
import toAlert from "@local/api/toAlert";

export default function getUser(db: Firestore, uuid: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Users", uuid);
        
        try {
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
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};