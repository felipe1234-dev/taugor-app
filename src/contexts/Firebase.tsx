import React from "react";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { app, db, storage } from "@local/api/index";

export interface FirebaseValue {
    app: FirebaseApp,
    db: Firestore,
    storage: FirebaseStorage
};

export const FirebaseContext = React.createContext<FirebaseValue>({ app, db, storage });

export const FirebaseProvider = (props: { children: React.ReactNode }) => (
    <FirebaseContext.Provider value={{ app, db, storage }}>
        {props.children}
    </FirebaseContext.Provider>
);