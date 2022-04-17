import { Firestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

import { getUserByUuid } from "@local/api/collections/Users";
import { User } from "@local/interfaces";
import { Severity } from "@local/types";

export const login = async(email: string, password: string) => {
    const auth = getAuth();
    
    const loginPromise = await signInWithEmailAndPassword(auth, email, password);
    
    return loginPromise;
};

export const logout = async() => {
    const auth = getAuth();
    const logoutPromise = await auth.signOut();
    
    return logoutPromise;
};

export const getCurrentUser = async(db: Firestore): Promise<User|null> => {
    const auth = getAuth();
    const currUser = auth.currentUser;
    
    if (currUser) {
        const { uid } = currUser;
        return await getUserByUuid(db, uid);
    }
    
    return null;
};

export const onError  = (error: FirebaseError): { message: string, severity: Severity } => {
    switch (error.code) {
        case "auth/wrong-password":
            return ({
                severity: "warning",
                message: "Sem resultados :( Tente verificar sua senha"
            });
    
        case "auth/user-not-found":
            return ({
                severity: "warning",
                message: "Sem resultados :( Tente verificar sua senha"
            });
            
        default: 
            return ({
                severity: "error",
                message: `Erro desconhecido: (${error.code}) ${error.message}`
            });
    }
}