import { client } from "./credentials";

const startDatabase = async (): Promise<void> => {
	await client.connect();
	console.log("Database connected!");
};

export { startDatabase };
