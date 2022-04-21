// Firebase
import { getAuth } from "@firebase/auth";
import { Firestore } from "@firebase/firestore";

// Local
import { User } from "@local/interfaces";
import { Alert } from "@local/types";
import { getUserByUuid } from "../collections/Users";

export default function getCurrentUser(db: Firestore): Promise<User|Alert> {
    return new Promise((resolve, reject) => {
        const auth     = getAuth();
        const currUser = auth.currentUser;
        
        if (!!currUser) {
            const { uid } = currUser; 
            
            getUserByUuid(db, uid)
                .then((user) => (
                    resolve(user)
                ))
                .catch((error) => (
                    reject(error)
                ));
        }
    });
};