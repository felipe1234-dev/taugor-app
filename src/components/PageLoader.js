// Libs
import React, { useState, useEffect } from "react";
import MyComponent from "react-fullpage-custom-loader";

// Functions
import { getEnv } from "../functions";

// Configs
const LoadingAnimation = (props) => <MyComponent {...props} />;
const loaderTypes = [
	"square-spin",
	"ball-newton-cradle",
	"ball-scale-ripple-multiple",
	"square-jelly-box",
	"ball-climbing-dot",
	"ball-atom",
];

function PageLoader() {
	const [joke, setJoke] = useState("");
	const [loaderType, setLoaderType] = useState(null);

	useEffect(() => {
		let chosenLoader = Math.round(Math.random() * (loaderTypes.length - 1));
		chosenLoader = loaderTypes[chosenLoader];

		setLoaderType(chosenLoader);
	}, []);

	useEffect(() => {
		const fetchJoke = async () => {
			/* Fiz rapidamente um CORS proxy clonando um repositório,
			 * porque, o dono da API não colocou "Access-Control-Allow-Origin: *"
			 * no header dele. :/
			 */

			fetch(getEnv("CORS_PROXY") + getEnv("JOKES_API"))
				.then((resp) => resp.json())
				.then((resp) => setJoke(resp.question + " " + resp.answer))
				.catch((error) => console.error("Error: ", error));
		};

		fetchJoke();
	}, []);

	const props = {
		loadingAnim: {
			loaderType: loaderType,
			sentences: [joke],
			height: "100vh",
			width: "100%",
			fadeIn: true,
			wrapperBackgroundColor: `var(--background)`,
			color: "var(--blue)",
			textStyles: {
				color: "var(--gray-dark)",
			},
		},
	};

	return (loaderType && joke) && <LoadingAnimation {...props.loadingAnim} />;
}

export default PageLoader;
