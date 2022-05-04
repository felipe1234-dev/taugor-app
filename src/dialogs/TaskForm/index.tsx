// Libs
import {
    createContext,
    useEffect,
    useState
} from "react";

// TaskForm components
import Steps from "./Steps";

// Interfaces
import { Task } from "@local/interfaces";

export interface TaskFormValue {
    updates: Partial<Task>,
    uploads: Array<File>,
    update: (newData: Partial<Task>) => void,
    upload: (fileList: Array<File>) => void,
    submit: () => void,
};

export const TaskFormContext = createContext<TaskFormValue>({
    updates: {},
    uploads: [],
    update: () => { },
    upload: () => { },
    submit: () => { }
});

interface TaskFormProps {
    formTitle: string,
    onSubmit?: (formData: {
        updates: Partial<Task>, 
        uploads: Array<File>
    }) => void,
    onChange?: (editedTask: Partial<Task>) => void,
    onUpload?: (fileList: Array<File>) => void
};

export default function TaskForm({
    formTitle,
    onSubmit, 
    onChange, 
    onUpload, 
    ...task 
}: Task & TaskFormProps) {
    const [updates, setUpdates] = useState<Partial<Task>>({});
    const [uploads, setUploads] = useState<Array<File>>([]);

    useEffect(() => {
        if (!!onChange) {
            onChange(updates);
        }

        if (!!onUpload) {
            onUpload(uploads);
        }
    }, [updates, uploads]);

    return (
        <TaskFormContext.Provider value={{
            updates,
            uploads,
            submit: () => {
                if (!!onSubmit) {
                    onSubmit({ updates, uploads });
                }
            },
            update: (newData) => (
                setUpdates(prevState => (
                    { ...prevState, ...newData }
                ))
            ),
            upload: (fileList: Array<File>) => (
                setUploads(fileList)
            )
        }}>
            <Steps formTitle={formTitle} {...task} />
        </TaskFormContext.Provider>
    );
};