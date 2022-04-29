import { FirebaseError } from "firebase/app";
import { 
    doc, 
    Firestore, 
    getDoc
} from "firebase/firestore";
import { Task } from "@local/interfaces";
import toAlert from "@local/api/toAlert";

export default function getActivityByUuid(db: Firestore, uuid: string): Promise<Task> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Activities", uuid);
        
        try {
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                resolve({ 
                    uuid, 
                    ...docSnap.data() 
                } as Task);
            } else {
                reject({
                    severity: "error",
                    message: "Atividade não existe"
                });
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};