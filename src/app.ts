import express, { Application, json } from "express";
import { startDatabase } from "./database";

import { validateKeys } from "./middlewares";

import {
	getRequests,
	postRequests,
	patchRequests,
	deleteRequests,
} from "./requests";

//call express
const app: Application = express();
app.use(json());

//port
const PORT = 3000;

//Developers requests
app.get("/developers", getRequests.getAllDevelopers);

app.get("/developers/:id", getRequests.getDeveloper);

app.post("/developers", validateKeys, postRequests.postDeveloper);
app.post(
	"/developers/:id/infos",
	validateKeys,
	postRequests.postDeveloperInfos
);

app.patch("/developers/:id", validateKeys, patchRequests.patchDeveloper);
app.patch(
	"/developers/:id/infos",
	validateKeys,
	patchRequests.patchDeveloperInfos
);

app.delete("/developers/:id", deleteRequests.deleteDeveloper);

//Projects requests
app.get("/projects", getRequests.getAllProjects);
app.get("/projects/:id", getRequests.getProject);

app.post("/projects", validateKeys, postRequests.postProject);
app.post(
	"/projects/:id/technologies",
	validateKeys,
	postRequests.postTechProject
);

app.patch("/projects/:id", validateKeys, patchRequests.patchProject);

app.delete("/projects/:id", deleteRequests.deleteProject);
app.delete(
	"/projects/:id/technologies/:name",
	deleteRequests.deleteTechProject
);

app.listen(PORT, async () => {
	await startDatabase();
	console.log(`Sever is running on port ${PORT}.`);
});
