// Libs
import { 
    useState, 
    useContext, 
    useRef,
    FormEvent
} from "react";
import {
    Box,
    Button,
    StepButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step
} from "@mui/material";

// TaskForm components
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthSection from "./FourthSection";

// Contexts
import { TaskFormContext } from "./index";

export default function Steps() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [key: number]: boolean
    }>({});
    
    const { formTitle, submitTask } = useContext(TaskFormContext);
    const formRef = useRef<HTMLFormElement>(null);
    const formElem = formRef.current;
    
    const steps = [
        <FirstStep />,
        <SecondStep />,
        <ThirdStep />,
        <FourthSection />
    ];
    
    const formIsValid = formElem?.checkValidity() || false;
    const stepIsLast = activeStep === steps.length - 1;
    const stepIsFirst = activeStep === 0;
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        submitTask();
    };
    
    const goBack = () => {
        setCompleted((prevState) => {
            prevState[activeStep] = false;
            return prevState;
        });
        setActiveStep((prevState) => prevState - 1);
    };
    
    const goNext = () => {
        if (!!formElem) {
            if (!formIsValid) {
                if (formElem.reportValidity) {
                    formElem.reportValidity();
                }
                
                setCompleted((prevState) => {
                    prevState[activeStep] = false;
                    return prevState;
                });
            } else {
                setCompleted((prevState) => {
                    prevState[activeStep] = true;
                    return prevState;
                });
                setActiveStep((prevState) => prevState + 1);
            }
        }
    };
    
    return (
        <form ref={formRef} onSubmit={onSubmit}>
            <DialogTitle>
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((elem, i) => (
                            <Step key={i} completed={completed[i]}>
                                <StepButton color="inherit" onClick={() => setActiveStep(i)}>
                                    Etapa {i + 1}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ p: 2 }}>
                    {steps[activeStep]}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={stepIsFirst}
                    onClick={goBack}
                    sx={{ mr: 1 }}
                >
                    Voltar
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                    disabled={stepIsLast}
                    onClick={goNext}
                    sx={{ mr: 1 }}
                >
                    Seguir
                </Button>
                {(stepIsLast && formIsValid) && (
                    <Button type="submit">
                        Enviar
                    </Button>
                )}
            </DialogActions>
        </form>
    );
};