import { 
    doc, 
    Firestore, 
    getDoc
} from "firebase/firestore";
import { Task } from "@local/interfaces";
import { Alert } from "@local/types";

export default function getActivityByUuid(db: Firestore, uuid: string): Promise<Task|Alert> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Activities", uuid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            resolve({ 
                uuid, 
                ...docSnap.data() 
            } as Task);
        }
        
        reject({
            severity: "error",
            message: "Atividade não existe"
        });
    });
};