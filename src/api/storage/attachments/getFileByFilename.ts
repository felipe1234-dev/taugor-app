import { 
    ref,
    getDownloadURL,
    FirebaseStorage
} from "firebase/storage";
import { File } from "@local/interfaces"; 
import toAlert from "@local/api/toAlert";

export default function getFileByFilename(storage: FirebaseStorage, filename: string): Promise<File> {
    return new Promise((resolve, reject) => {
        const fileRef  = ref(storage, `attachments/${filename}`);
        const fileType = filename.match(/\.\w+$/)![0].replace(".", "");
        const fileName = filename.replace(/-id\d+\.\w+$/, "");
    
        if (!!fileRef) {
            getDownloadURL(fileRef)
                .then((fileUrl) => (
                    resolve({
                        name: fileName,
                        type: fileType as "pdf"|"txt",
                        url: fileUrl
                    })
                ))
                .catch((error) => (
                    reject(toAlert(error))
                ));
        } else {
            reject({
                severity: "warning",
                message: `Anexo ${fileName}.${fileType} não existe`
            });
        }
    });
};