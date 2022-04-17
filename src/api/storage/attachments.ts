import { 
    ref,
    getDownloadURL,
    FirebaseStorage
} from "firebase/storage";
import { File } from "@local/interfaces";

export const getFileByFilename = async(storage: FirebaseStorage, filename: string) => {
    const fileRef = ref(storage, `attachments/${filename}`);
    
    if (!!fileRef) {
        const fileUrl  = await getDownloadURL(fileRef);
        const fileType = filename.match(/\.\w+$/)![0].replace(".", "");
        const fileName = filename.replace(/-id\d+\.\w+$/, "");
        
        return {
            name: fileName,
            type: fileType,
            url: fileUrl
        } as File;
    }
     
    console.error("File does not exist");
    
    return null;
};