// Libs
import { 
	useState, 
	useEffect,
	useContext
} from "react";
import { default as LoadingAnimation } from "react-fullpage-custom-loader";

// Functions
import { getEnv } from "@local/functions";

// Contexts
import { AlertContext } from "@local/contexts";

// Configs
const loaders = [
	"square-spin",
	"ball-newton-cradle",
	"ball-scale-ripple-multiple",
	"square-jelly-box",
	"ball-climbing-dot",
	"ball-atom",
];

export default function PageLoader() {
	const [joke, setJoke]     = useState<string>("");
	const [loader, setLoader] = useState<string|null>(null);

    const { setSeverity, setMessage } = useContext(AlertContext);
	
	useEffect(() => {
		const randIndex = Math.round(Math.random() * (loaders.length - 1));
		const loader    = loaders[randIndex];
		
		console.log(randIndex)
		console.log(loader)
		setLoader(loader);
	}, []);

	useEffect(() => {
		const fetchJoke = async() => {
			/* Fiz rapidamente um CORS proxy clonando um repositório,
			 * porque, o dono da API não colocou "Access-Control-Allow-Origin: *"
			 * no header dele. :/
			 */
            
            const corsProxy = getEnv("CORS_PROXY");
            const jokesApi  = getEnv("JOKES_API");
            
            if (!!corsProxy && !!jokesApi) {
                const apiUrl = corsProxy + jokesApi; 
                
                fetch(apiUrl)
                    .then((resp) => resp.json())
                    .then((resp) => setJoke(resp.question + " " + resp.answer))
                    .catch((error: Error) => {
						setSeverity("error" as "error");
						setMessage("Erro desconhecido: " + error.message);
					});
            }
		}

		fetchJoke();
	}, []);

	const loadingAnimation = {
		loader: loader,
		sentences: [joke],
		height: "100vh",
		width: "100%",
		fadeIn: true,
		wrapperBackgroundColor: `var(--background)`,
		color: "var(--blue)",
		textStyles: {
			color: "var(--gray-dark)",
		}
	};

	return (!!loader && !!joke)? (
        <LoadingAnimation {...loadingAnimation} />
    ) : (
		<span></span>
	);
};