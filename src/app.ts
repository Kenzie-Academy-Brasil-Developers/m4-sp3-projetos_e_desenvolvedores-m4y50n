import express, { Application, json } from "express";
import { startDatabase } from "./database";

import { removeExtraKeys } from "./middlewares";

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

app.post("/developers", removeExtraKeys, postRequests.postDeveloper);
app.post(
	"/developers/:id/infos",
	removeExtraKeys,
	postRequests.postDeveloperInfos
);

app.patch("/developers/:id", patchRequests.patchDeveloper);
app.patch("/developers/:id/infos", patchRequests.patchDeveloperInfos);

app.delete("/developers/:id", deleteRequests.deleteDeveloper);

//Projects requests
app.get("/projects", getRequests.getAllProjects);
app.get("/projects/:id", getRequests.getProject);

app.post("/projects", removeExtraKeys, postRequests.postProject);
app.post(
	"/projects/:id/technologies",
	removeExtraKeys,
	postRequests.postTechProject
);

app.patch("/projects/:id", patchRequests.patchProject);

app.delete("/projects/:id", deleteRequests.deleteProject);
app.delete(
	"/projects/:id/technologies/:name",
	deleteRequests.deleteTechProject
);

app.listen(PORT, async () => {
	await startDatabase();
	console.log(`Sever is running on port ${PORT}.`);
});
