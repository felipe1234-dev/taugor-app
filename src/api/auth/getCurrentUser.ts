// Firebase
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Firestore } from "@firebase/firestore";

// Local
import { User } from "@local/interfaces";
import { getUser } from "../collections/Users";
import logOut from "./logOut";

export default function getCurrentUser(db: Firestore): Promise<User|null> {
    return new Promise((resolve, reject) => {
        const refreshToken = sessionStorage.getItem("Auth Token");
        const auth = getAuth();

        if (!!refreshToken) {
            const tokenDate = Number(sessionStorage.getItem("Assign Date"));
            const timeNow = new Date().getTime();
            const minutesPassed = (timeNow - tokenDate) / (1000 * 60);

            if (minutesPassed > 60) {
                logOut()
                    .catch((error) => (
                        reject(error)
                    ));
            }
        } else {
            logOut()
                .catch((error) => (
                    reject(error)
                )); 
        }
        
        onAuthStateChanged(auth, (user) => {            
            if (!!user) {
                const { uid } = user; 
                
                getUser(db, uid)
                    .then((user) => (
                        resolve(user)
                    ))
                    .catch((error) => (
                        reject(error)
                    ));
            } else {
                resolve(null);
            }
        });        
    });
};