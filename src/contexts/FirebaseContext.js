import React, { createContext } from "react";
import { app, db, storage } from "@app/api";

const FirebaseContext = createContext({});

const FirebaseProvider = ({ children }) => (
    <FirebaseContext.Provider value={{ app: app, db: db, storage: storage }}>
        {children}
    </FirebaseContext.Provider>
)

export { FirebaseContext, FirebaseProvider };