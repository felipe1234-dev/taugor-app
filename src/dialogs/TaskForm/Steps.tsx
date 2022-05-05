// Libs
import { 
    useState, 
    useContext, 
    useRef
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
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";

// Contexts
import { TaskFormContext } from "./index";

export default function Steps() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<Array<number>>([]);
    
    const { formTitle, submit } = useContext(TaskFormContext);
    const formRef = useRef<HTMLFormElement>(null);
    const formElem = formRef.current;
    
    const steps = [
        <FirstSection />,
        <SecondSection />,
        <ThirdSection />,
        <FourthSection />
    ];
    
    const formIsValid = formElem?.checkValidity() || false;
    const stepIsLast = activeStep === steps.length - 1;
    const stepIsFirst = activeStep === 0;
    
    const onSubmit = (event: any) => {
        event.preventDefault();
    
        submit();
    }
    
    const goBack = () => {
        setActiveStep((prevState) => prevState - 1);
    }
    
    const goNext = () => {
        if (!!formElem) {
            if (!formElem.checkValidity()) {
                if (formElem.reportValidity) {
                    formElem.reportValidity();
                }
                
                setCompleted((prevState) => prevState.filter((step) => step !== activeStep));
            } else {
                setCompleted((prevState) => [ ...prevState, activeStep ]);
                setActiveStep((prevState) => prevState + 1);
            }
        }
    }
    
    return (
        <form ref={formRef} onSubmit={onSubmit}>
            <DialogTitle>
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((elem, i) => (
                            <Step key={i} completed={i in completed}>
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