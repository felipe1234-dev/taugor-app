import { useEffect, useState } from "react";

export default function useOnScroll(threshold: number) {
    const [crossedTheLimit, setCrossedTheLimit] = useState<boolean>(false);    
    
    const onScrollHandler = () => {
        setCrossedTheLimit(window.pageYOffset > threshold);
    }
    
    useEffect(() => {
        window.removeEventListener("scroll", onScrollHandler);
        window.addEventListener("scroll", onScrollHandler);
    }, [threshold]);

    return crossedTheLimit;
};