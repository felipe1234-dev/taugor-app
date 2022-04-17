import { getEnv } from "@local/functions/index";

const config = {
	apiKey: getEnv("API_KEY"),
	authDomain: getEnv("AUTH_DOMAIN"),
	projectId: getEnv("PROJECT_ID"),
	storageBucket: getEnv("STORAGE_BUCKET"),
	messagingSenderId: getEnv("MESSAGING_SENDER_ID"),
    appId: getEnv("APP_ID")
};

export default config;