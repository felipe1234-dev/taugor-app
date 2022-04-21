import { Alert } from "@local/types";
import { FirebaseError } from "firebase/app";

export default function toAlert(error: FirebaseError): Alert {
    switch (error.code) {
        // Auth
        case "auth/email-already-in-use":
            return ({
                severity: "error",
                message: "Escolha outro email, email já está em uso"
            });  
        
        case "auth/wrong-password":
            return ({
                severity: "error",
                message: "Sem resultados, tente verificar sua senha"
            });
    
        case "auth/user-not-found":
            return ({
                severity: "error",
                message: "Sem resultados, tente verificar seu email"
            });
            
        // Storage
        case "storage/object-not-found":
            return ({
                severity: "error",
                message: "Anexo não encontrado"
            });
            
        default: 
            return ({
                severity: "error",
                message: `Erro desconhecido: (${error.code}) ${error.message}`
            });
    }
}