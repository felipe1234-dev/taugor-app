import { 
    Fragment, 
    useState, 
    useEffect, 
    useContext 
} from "react";
import {
    DialogTitle,
    DialogContentText, 
    TextField, 
    MenuItem 
} from "@mui/material";

import { TaskFormContext } from "./index";
import { ChipField } from "@local/components";
import { 
    STATUS_TYPES, 
    PRIORITY_TYPES, 
    ENV_TYPES, 
    INFLUENCED_USERS,
    TAGS
} from "@local/constants";
import { Task } from "@local/interfaces";
import { 
    Status, 
    Environment,
    Priority,
    Influence,
    Tag
} from "@local/types";

export default function FourthSection(task: Task) {
    const [status, setStatus] = useState<Status>();
    const [priority, setPriority] = useState<Priority>();
    const [environment, setEnvironment] = useState<Environment>();
    const [influence, setInfluence] = useState<Influence>();
    const [product, setProduct] = useState<string>("");
    const [tags, setTags] = useState<Array<Tag>>([]);
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setStatus(task.status);
        setPriority(task.priority);
        setEnvironment(task.environment);
        setInfluence(task.influencedUsers);
        setProduct(task.product);
        setTags(task.tags);
    }, [
        task.status, 
        task.priority, 
        task.environment, 
        task.influencedUsers, 
        task.product,
        task.tags
    ]);
    
    useEffect(() => {
        update({
            status,
            priority,
            environment,
            influencedUsers: influence,
            product,
            tags
        });
    }, [
        status, 
        priority, 
        environment, 
        influence, 
        product, 
        tags
    ]);
    
    const textInputs = [
        {
            label: "Nome do produto",
            placeholder: "Nome do produto",
            maxLength: 20,
            value: product,
            onChange: (event: any) => setProduct(event.target.value)
        }
    ];
    
    const selects = [
        {
            label: "Situação atual",
            value: status || "",
            onChange: (event: any) => setStatus(event.target.value),
            options: [ ...STATUS_TYPES ]
        },
        {
            label: "Nível de urgência",
            value: priority || "",
            onChange: (event: any) => setPriority(event.target.value),
            options: [ ...PRIORITY_TYPES ]
        },
        {
            label: "Ambiente",
            value: environment || "",
            onChange: (event: any) => setEnvironment(event.target.value),
            options: [ ...ENV_TYPES ]
        },
        {
            label: "Usuários influenciados",
            value: influence || "",
            onChange: (event: any) => setInfluence(event.target.value),
            options: [ ...INFLUENCED_USERS ]
        }
    ];
    
    return (
        <>
            <DialogTitle sx={{ pl: 0 }}>
                Mais informações
            </DialogTitle>
            <DialogContentText sx={{ mb: 2 }}>
                Aqui estão mais algumas informações variadas para você verificar
            </DialogContentText>
            
            <DialogContentText mt={2}>
                Categorias
            </DialogContentText>
            <ChipField 
                multiline
                options={[...TAGS]}
                maxRows={4}
                value={tags}
                onChange={(value) => setTags(value as Array<Tag>)}
                placeholder="Categorias"
                sx={{ mb: 0, mt: 2 }}
            />
            
            {textInputs.map((item, i) => (
                <Fragment key={i}>
                    <DialogContentText mt={2}>
                        {item.label}
                    </DialogContentText>
                    <TextField
                        required
                        multiline
                        maxRows={4}
                        placeholder={item.placeholder}
                        value={item.value}
                        onChange={item.onChange}
                        inputProps={{ maxLength: item.maxLength }}
                        sx={{ mb: 0, mt: 2 }}
                    />
                </Fragment>
            ))}
            
            {selects.map((item, i) => (
                <Fragment key={i}>
                    <DialogContentText mt={2}>
                        {item.label}
                    </DialogContentText>
                    <TextField
                        select
                        required
                        value={item.value}
                        onChange={item.onChange}
                        sx={{ mb: 0, mt: 2 }}
                    >
                        {item.options.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Fragment>
            ))}
        </>
    );
}