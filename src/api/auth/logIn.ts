// Firebase
import { FirebaseError } from "firebase/app";
import { 
    UserCredential, 
    getAuth, 
    signInWithEmailAndPassword 
} from "firebase/auth";

// Local
import { Alert } from "@local/types";
import toAlert from "../toAlert";

type LoginSuccess = {
    loginDate: number,
    refreshToken: string,
    userCredential: UserCredential
};

export default function logIn(email: string, password: string): Promise<LoginSuccess|Alert> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((resp: any) => (
                resolve({
                    refreshToken: resp._tokenResponse.refreshToken,
                    loginDate: new Date().getTime(),
                    userCredential: resp as UserCredential
                })
            ))
            .catch((error: FirebaseError) => (
                reject(toAlert(error)) 
            ));
    });
};