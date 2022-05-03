import { FirebaseError } from "firebase/app";
import { 
    ref,
    getDownloadURL,
    FirebaseStorage
} from "firebase/storage";
import { Attach } from "@local/interfaces"; 
import toAlert from "@local/api/toAlert";

export default function getAttach(storage: FirebaseStorage, attachname: string): Promise<Attach> {
    return new Promise(async (resolve, reject) => {
        const attachRef  = ref(storage, `attachments/${attachname}`);
        const attachId   = attachname.match(/-id(\d+)\.\w+$/)![1];
        const attachType = attachname.match(/\.\w+$/)![0].replace(".", "");
        const attachName = attachname.replace(/-id\d+\.\w+$/, "");
    
        if (!!attachRef) {
            try {
                const attachUrl = await getDownloadURL(attachRef);
                
                resolve({
                    id: attachId,
                    name: attachName,
                    type: attachType as "pdf"|"txt",
                    url: attachUrl
                });
            } catch (error) {
                reject(toAlert(error as FirebaseError));
            }
        } else {
            reject({
                severity: "warning",
                message: `Anexo ${attachName}.${attachType} não existe`
            });
        }
    });
};