import express, { Application, json } from "express";
import { startDatabase } from "./database";

import {
	validateKeys,
	emailDuplicated,
	verifyId,
	verifyTech,
	validateRequiredDevKeys,
	validateRequiredInfosKeys,
	validateRequiredProjKeys,
	validateRequiredTechKeys,
} from "./middlewares";

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

app.get("/developers/:id", verifyId, getRequests.getDeveloper);

app.post(
	"/developers",
	validateKeys,
	emailDuplicated,
	validateRequiredDevKeys,
	postRequests.postDeveloper
);
app.post(
	"/developers/:id/infos",
	verifyId,
	validateKeys,
	validateRequiredInfosKeys,
	postRequests.postDeveloperInfos
);

app.patch(
	"/developers/:id",
	verifyId,
	validateKeys,
	emailDuplicated,
	validateRequiredDevKeys,
	patchRequests.patchDeveloper
);
app.patch(
	"/developers/:id/infos",
	verifyId,
	validateKeys,
	validateRequiredInfosKeys,
	patchRequests.patchDeveloperInfos
);

app.delete("/developers/:id", verifyId, deleteRequests.deleteDeveloper);

//Projects requests
app.get("/projects", getRequests.getAllProjects);
app.get("/projects/:id", verifyId, getRequests.getProject);

app.post(
	"/projects",
	validateKeys,
	validateRequiredProjKeys,
	postRequests.postProject
);
app.post(
	"/projects/:id/technologies",
	verifyId,
	validateKeys,
	validateRequiredTechKeys,
	postRequests.postTechProject
);

app.patch(
	"/projects/:id",
	verifyId,
	validateKeys,
	validateRequiredProjKeys,
	patchRequests.patchProject
);

app.delete("/projects/:id", verifyId, deleteRequests.deleteProject);
app.delete(
	"/projects/:id/technologies/:name",
	verifyId,
	verifyTech,
	deleteRequests.deleteTechProject
);

app.listen(PORT, async () => {
	await startDatabase();
	console.log(`Sever is running on port ${PORT}.`);
});
