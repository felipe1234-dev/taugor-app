import { 
    ref,
    getDownloadURL
} from "firebase/storage";

const getURLByFilename = async(storage, filename) => {
    const fileRef = ref(storage, `attachments/${filename}`);
    return await getDownloadURL(fileRef);
}

export { 
    getURLByFilename
};