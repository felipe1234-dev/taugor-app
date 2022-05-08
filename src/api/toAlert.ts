import { Alert } from "@local/interfaces";
import { FirebaseError } from "firebase/app";

export default function toAlert(error: FirebaseError): Alert {
    switch (error.code) {
        // Extra
        case "permission-denied": 
            return ({
                severity: "warning",
                message: "Sua sessão expirou (duração máxima: 1h), recarregue a página e logue novamente."
            });
        
        // Auth
        case "auth/network-request-failed":
            return ({
                severity: "warning",
                message: "Sua conexão com a Internet pode estar lenta, por favor, tente mais tarde"
            });
        
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
                severity: "warning",
                message: "Arquivo não encontrado"
            });
            
        default: 
            return ({
                severity: "error",
                message: `Erro desconhecido: (${error.code}) ${error.message}`
            });
    }
}