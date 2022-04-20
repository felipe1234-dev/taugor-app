import { 
	useEffect, 
	useState, 
	useRef,
	RefObject 
} from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) =>
			setIsOnScreen(entry.isIntersecting)
		);
	}, []);

	useEffect(() => {
		if (!!observerRef.current && !!ref.current) {
			observerRef.current.observe(ref.current);

			return () => {
				observerRef.current!.disconnect();
			};
		}
	}, [ref]);

	return isOnScreen;
};