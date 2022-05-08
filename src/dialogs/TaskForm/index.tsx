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

const sampleTask: Partial<Task> = {
    title: [],
    description: "",
    brief: "",  
    tags: [ "Produtos e serviços" ],
    attachments: [], 
    priority: "Baixa", 
    influencedUsers: "1-10",
    product: "",
    environment: "Dados/Ambiente de Testes - Somente testes",
    status: "Em análise"
};

interface TaskFormValue {
    formTitle: string,
    task: Partial<Task>,
    updates: Partial<Task>,
    uploads: Array<File>,
    update: (newData: Partial<Task>) => void,
    upload: (mode: "reset"|"add", list: Array<File>) => void,
    submit: () => void,
};

export const TaskFormContext = createContext<TaskFormValue>({
    formTitle: "",
    task: sampleTask,
    updates: {},
    uploads: [],
    update: () => {},
    upload: () => {},
    submit: () => {}
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
}: TaskFormProps & Partial<Task>) {
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
            formTitle,
            task: !!task ? task : sampleTask,
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
            upload: (mode: "reset"|"add", list: Array<File>) => (
                setUploads(prevState => (
                    mode === "add" ? (
                        [ ...prevState, ...list ]
                    ) : list
                ))
            )
        }}>
            <Steps />
        </TaskFormContext.Provider>
    );
};