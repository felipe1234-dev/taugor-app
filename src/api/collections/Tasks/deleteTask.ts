import { FirebaseError } from "firebase/app";
import { 
    doc, 
    Firestore,
    deleteDoc,
    getDoc
} from "firebase/firestore";
import { Task } from "@local/interfaces";
import { getCurrentUser } from "@local/api/auth";
import toAlert from "@local/api/toAlert";

export default function deleteTask(db: Firestore, uuid: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const docRef  = doc(db, "Tasks", uuid);
        
        try {
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const task = { 
                    uuid, 
                    ...docSnap.data() 
                } as Task;
                
                try {
                    const user = await getCurrentUser(db);
                    
                    if (!!user) {
                        if (user.uuid === task.postedBy) {
                            deleteDoc(docRef)
                                .then(resolve)
                                .catch((error: FirebaseError) => (
                                    reject(toAlert(error))
                                ));
                        } else {
                            reject({
                                severity: "error",
                                message: "Você não é o dono dessa atividade"
                            });
                        }
                    } else {
                        reject({
                            severity: "error",
                            message: "Usuário não logado"
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject({
                    severity: "error",
                    message: "Atividade não existe"
                });
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};