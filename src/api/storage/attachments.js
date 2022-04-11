import { 
    ref,
    getDownloadURL
} from "firebase/storage";

const getURLByFilename = async(storage, filename) => {
    const fileRef    = ref(storage, `attachments/${filename}`);
    return await getDownloadURL(fileRef);
}

const handleError = (error) => {
    switch (error.code) {
        case "storage/object-not-found":
            return ({
                severity: "error",
                message: "Arquivo não existe"
            });
            
        case "storage/unauthorized":
            return ({
                severity: "error",
                message: "Usuário não tem permissão de acessar o arquivo"
            });
            
        case "storage/canceled":
            return ({
                severity: "error",
                message: "Usuário cancelou o upload"
            });
  
        case "storage/unknown":
        default:
            return ({
                severity: "error",
                message: `Erro desconhecido: (${error.code}) ${error.message}`
            });
    }
}

export { 
    getURLByFilename,
    handleError
};