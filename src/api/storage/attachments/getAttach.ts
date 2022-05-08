import { FirebaseError } from "firebase/app";
import { 
    ref,
    getDownloadURL,
    FirebaseStorage
} from "firebase/storage";

import { getEnv } from "@local/functions";
import { Attach } from "@local/interfaces"; 
import toAlert from "@local/api/toAlert";

export default function getAttach(storage: FirebaseStorage, attachname: string): Promise<Attach> {
    return new Promise(async (resolve, reject) => {
        const attachRef = ref(storage, `attachments/${attachname}`);
        const id   = attachname.match(/-id(\d+)\.\w+$/)![1];
        const ext  = attachname.match(/\.\w+$/)![0].replace(".", "");
        const name = attachname.replace(/-id\d+\.\w+$/, "");
    
        if (!!attachRef) {
            try {
                const url = await getDownloadURL(attachRef);
                
                fetch((getEnv("CORS_PROXY") ?? "") + url)
                    .then((resp) => resp.blob())
                    .then((blob) => {
                        const file = new File(
                            [ blob ],
                            `${name}.${ext}`,
                            { 
                                lastModified: Number(id),
                                type: blob.type
                            }
                        );
                            
                        resolve({
                            id,
                            name,
                            type: ext as "pdf"|"txt",
                            url,
                            file
                        });
                    });
            } catch (error) {
                reject(toAlert(error as FirebaseError));
            }
        } else {
            reject({
                severity: "warning",
                message: `Anexo ${name}.${ext} não existe`
            });
        }
    });
};