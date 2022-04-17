// Libs
import { useState, useEffect } from "react";
import { default as LoadingAnimation } from "react-fullpage-custom-loader";

// Functions
import { getEnv } from "@local/functions";

// Configs
const loaders = [
	"square-spin",
	"ball-newton-cradle",
	"ball-scale-ripple-multiple",
	"square-jelly-box",
	"ball-climbing-dot",
	"ball-atom",
] as const;

type Loader = typeof loaders[number];

export default function PageLoader() {
	const [joke, setJoke]     = useState<string>("");
	const [loader, setLoader] = useState<Loader|null>(null);

	useEffect(() => {
		const randIndex: number = Math.round(Math.random() * (loaders.length - 1));
		const loader: Loader    = loaders[randIndex];
		setLoader(loader);
	}, []);

	useEffect(() => {
		const fetchJoke = async() => {
			/* Fiz rapidamente um CORS proxy clonando um repositório,
			 * porque, o dono da API não colocou "Access-Control-Allow-Origin: *"
			 * no header dele. :/
			 */
            
            const corsProxy: string|undefined = getEnv("CORS_PROXY");
            const jokesApi: string|undefined  = getEnv("JOKES_API");
            
            if (!!corsProxy && !!jokesApi) {
                const apiUrl: string = corsProxy + jokesApi; 
                
                fetch(apiUrl)
                    .then((resp) => resp.json())
                    .then((resp) => setJoke(resp.question + " " + resp.answer))
                    .catch((error) => console.error("Error: ", error));
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