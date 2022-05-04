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
        const fileType = file.name.match(/\.(\w+)$/)![1];
        const filename = file.name.replace("." + fileType, "");
        const filenameInStorage = `${filename}-id${file.lastModified}.${fileType}`;
        
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