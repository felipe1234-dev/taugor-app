import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import toAlert from "../toAlert";

export default function logOut() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        
        signOut(auth)
            .then(resolve)
            .catch((error: FirebaseError) => (
                reject(toAlert(error)) 
            ));
    });
};