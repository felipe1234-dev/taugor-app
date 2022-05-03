// Libs
import { 
    createContext,
    useEffect, 
    useState 
} from "react";
import { Box } from "@mui/material";

// TaskForm components
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";

// Interfaces
import { Task } from "@local/interfaces";

export interface TaskFormValue {
    updates: Partial<Task>,
    uploads: Array<File>,
    update: (newData: Partial<Task>) => void,
    upload: (fileList: Array<File>) => void
};

export const TaskFormContext = createContext<TaskFormValue>({
    updates: {},
    uploads: [],
    update: () => {},
    upload: () => {}
});

interface TaskFormProps {
    onChange?: (editedTask: Partial<Task>) => void,
    onUpload?: (fileList: Array<File>) => void
};

export default function TaskForm({ onChange, onUpload, ...task }: Task & TaskFormProps) {
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
            update: (newData) => (
                setUpdates(prevState => (
                    { ...prevState, ...newData }
                ))
            ), 
            upload: (fileList: Array<File>) => (
                setUploads(fileList)
            )
        }}>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: 2,
                    mt: 2,
                    width: "100%"
                }}
            >
                <FirstSection {...task}/>
                <SecondSection {...task}/>
                <ThirdSection {...task}/>
                <FourthSection {...task}/>
            </Box>
        </TaskFormContext.Provider>
    );
};