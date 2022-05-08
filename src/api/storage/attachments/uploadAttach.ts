import { 
    FirebaseStorage, 
    ref, 
    uploadBytes,
    UploadResult
} from "firebase/storage";
import { FirebaseError } from "@firebase/util";
import toAlert from "@local/api/toAlert";

export default function uploadAttach(storage: FirebaseStorage, file: File): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
        const ext  = file.name.match(/\.(\w+)$/)![1];
        const name = file.name.replace("." + ext, "");
        const id   = file.lastModified;
        const filenameInStorage = `${name}-id${id}.${ext}`;
        
        try {
            const fileRef = ref(storage, `attachments/${filenameInStorage}`);
            
            uploadBytes(fileRef, file)
                .then((snap) => resolve(snap))
                .catch((error) => reject(toAlert(error)));
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
}