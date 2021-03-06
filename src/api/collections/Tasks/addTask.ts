import { FirebaseError } from "firebase/app";
import { 
    addDoc, 
    collection,
    DocumentReference,
    Firestore, 
    Timestamp
} from "firebase/firestore";
import { Task } from "@local/interfaces";
import { getCurrentUser } from "@local/api/auth";
import getTask from "./getTask";
import toAlert from "@local/api/toAlert";

export default function addTask(db: Firestore, newTask: Partial<Task>): Promise<Task> {
    return new Promise(async (resolve, reject) => {
        // Por segurança
        delete newTask.uuid;
        delete newTask.createdAt;
        delete newTask.postedBy;
        
        const collectionRef = collection(db, "Tasks");
        
        try {
            newTask.createdAt = Timestamp.now();
            
            try {
                const user = await getCurrentUser(db);
                
                if (!!user) {
                    newTask.postedBy = user.uuid;
                } else {
                    reject({
                        severity: "error",
                        message: "Usuário não logado"
                    });
                }
            } catch (error) {
                reject(error);
            }
            
            const docRef = await addDoc(collectionRef, newTask);
            
            try {
                const task = await getTask(db, docRef.id);
                resolve(task);
            } catch (error) {
                reject(error);
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};