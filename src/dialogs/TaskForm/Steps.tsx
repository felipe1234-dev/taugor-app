// Libs
import { useState, useContext } from "react";
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

// Interfaces
import { Task } from "@local/interfaces";

// Props interface
interface StepsProps {
    formTitle: string
};

export default function Steps({ formTitle }: StepsProps) {
    const [activeStep, setActiveStep] = useState<number>(0);
    const { submit } = useContext(TaskFormContext);
    
    const steps = [
        <FirstSection />,
        <SecondSection />,
        <ThirdSection />,
        <FourthSection />
    ];
    
    return (
        <>
            <DialogTitle>
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((elem, i) => (
                            <Step key={i} completed={false}>
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
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prevState) => prevState - 1)}
                    sx={{ mr: 1 }}
                >
                    Voltar
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep((prevState) => prevState + 1)}
                    sx={{ mr: 1 }}
                >
                    Seguir
                </Button>
                {(activeStep === steps.length - 1) && (
                    <Button onClick={submit}>
                        Enviar
                    </Button>
                )}
            </DialogActions>
        </>
    );
};