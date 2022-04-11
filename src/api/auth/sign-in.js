import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getUserByUuid } from "@app/collections/Users";

const login = async (email, password) => {
    const auth = getAuth();
    
    const loginPromise = await signInWithEmailAndPassword(auth, email, password);
    
    return loginPromise;
}

const logout = async () => {
    const auth = getAuth();
    const logoutPromise = await auth.signOut();
    
    return logoutPromise;
}

const getCurrentUser = async (db) => {
    const auth     = getAuth();
    const currUser = auth.currentUser;
    
    let user;

    if (currUser) {
        const { uid } = currUser;
        const userData = await getUserByUuid(db, uid);
        
        user = { uuid: uid, ...userData };
    }
    
    return user? user : false;
}

export { login, logout, getCurrentUser };